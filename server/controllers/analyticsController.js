const Booking = require('../models/Booking');
const Resource = require('../models/Resource');
const { Parser } = require('json2csv');

const getResourceUtilization = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : new Date('2025-01-01');
    const end = endDate ? new Date(endDate) : new Date('2025-12-31');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    let query = { status: 'approved', startTime: { $gte: start }, endTime: { $lte: end } };
    if (req.user.role === 'Manager') {
      query.department = req.user.department;
    }

    const bookings = await Booking.find(query).populate('resource', 'name department');
    const resources = await Resource.find(
      req.user.role === 'Manager' ? { department: req.user.department } : {}
    );

    const utilization = resources.map(resource => {
      const resourceBookings = bookings.filter(b => b.resource._id.toString() === resource._id.toString());
      const totalBookedHours = resourceBookings.reduce((sum, b) => {
        const duration = (new Date(b.endTime) - new Date(b.startTime)) / (1000 * 60 * 60); // Hours
        return sum + duration;
      }, 0);

      const totalAvailableHours = (end - start) / (1000 * 60 * 60); // Total hours in date range
      const utilizationRate = totalAvailableHours > 0 ? (totalBookedHours / totalAvailableHours) * 100 : 0;

      return {
        resourceId: resource._id,
        resourceName: resource.name,
        department: resource.department,
        bookedHours: totalBookedHours,
        utilizationRate: parseFloat(utilizationRate.toFixed(2)),
      };
    });

    res.json(utilization);
  } catch (error) {
    console.error('Resource utilization error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMostUsedResources = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : new Date('2025-01-01');
    const end = endDate ? new Date(endDate) : new Date('2025-12-31');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    let query = { status: 'approved', startTime: { $gte: start }, endTime: { $lte: end } };
    if (req.user.role === 'Manager') {
      query.department = req.user.department;
    }

    const bookings = await Booking.aggregate([
      { $match: query },
      { $group: { _id: '$resource', bookingCount: { $sum: 1 } } },
      { $sort: { bookingCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'resources',
          localField: '_id',
          foreignField: '_id',
          as: 'resource',
        },
      },
      { $unwind: '$resource' },
      {
        $project: {
          resourceId: '$_id',
          resourceName: '$resource.name',
          department: '$resource.department',
          bookingCount: 1,
        },
      },
    ]);

    res.json(bookings);
  } catch (error) {
    console.error('Most used resources error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getIdleTimes = async (req, res) => {
  try {
    const { resourceId, startDate, endDate } = req.query;
    if (!resourceId) {
      return res.status(400).json({ message: 'resourceId is required' });
    }

    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (req.user.role === 'Manager' && resource.department !== req.user.department) {
      return res.status(403).json({ message: 'Access denied: Resource not in your department' });
    }

    const start = startDate ? new Date(startDate) : new Date('2025-06-29');
    const end = endDate ? new Date(endDate) : new Date(start.getTime() + 24 * 60 * 60 * 1000); // 1 day

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    const bookings = await Booking.find({
      resource: resourceId,
      status: 'approved',
      startTime: { $gte: start },
      endTime: { $lte: end },
    });

    const idleSlots = [];
    let currentTime = new Date(start);
    while (currentTime < end) {
      const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour slots
      const isBooked = bookings.some(b => {
        const bStart = new Date(b.startTime);
        const bEnd = new Date(b.endTime);
        return bStart <= currentTime && bEnd > currentTime;
      });

      if (!isBooked) {
        idleSlots.push({
          startTime: currentTime.toISOString(),
          endTime: nextHour.toISOString(),
        });
      }
      currentTime = nextHour;
    }

    res.json({
      resourceId,
      resourceName: resource.name,
      department: resource.department,
      idleSlots,
    });
  } catch (error) {
    console.error('Idle times error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const exportUtilizationReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : new Date('2025-01-01');
    const end = endDate ? new Date(endDate) : new Date('2025-12-31');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    let query = { status: 'approved', startTime: { $gte: start }, endTime: { $lte: end } };
    if (req.user.role === 'Manager') {
      query.department = req.user.department;
    }

    const bookings = await Booking.find(query).populate('resource', 'name department');
    const resources = await Resource.find(
      req.user.role === 'Manager' ? { department: req.user.department } : {}
    );

    const utilization = resources.map(resource => {
      const resourceBookings = bookings.filter(b => b.resource._id.toString() === resource._id.toString());
      const totalBookedHours = resourceBookings.reduce((sum, b) => {
        const duration = (new Date(b.endTime) - new Date(b.startTime)) / (1000 * 60 * 60);
        return sum + duration;
      }, 0);

      const totalAvailableHours = (end - start) / (1000 * 60 * 60);
      const utilizationRate = totalAvailableHours > 0 ? (totalBookedHours / totalAvailableHours) * 100 : 0;

      return {
        resourceId: resource._id,
        resourceName: resource.name,
        department: resource.department,
        bookedHours: totalBookedHours,
        utilizationRate: parseFloat(utilizationRate.toFixed(2)),
      };
    });

    const fields = ['resourceId', 'resourceName', 'department', 'bookedHours', 'utilizationRate'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(utilization);

    res.header('Content-Type', 'text/csv');
    res.attachment('utilization-report.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export utilization report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getResourceUtilization,
  getMostUsedResources,
  getIdleTimes,
  exportUtilizationReport,
};