import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getResources, deleteResource } from '../../services/api';

const ResourceList = ({ filters }) => {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getResources(filters);
        setResources(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch resources');
      }
    };
    fetchResources();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteResource(id);
        setResources(resources.filter((resource) => resource._id !== id));
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete resource');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Resources</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div key={resource._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{resource.name}</h3>
            <p>Type: {resource.type}</p>
            <p>{resource.description}</p>
            {resource.location && <p>Location: {resource.location}</p>}
            {resource.capacity && <p>Capacity: {resource.capacity}</p>}
            {resource.features?.length > 0 && <p>Features: {resource.features.join(', ')}</p>}
            {resource.availability && <p>Availability: {resource.availability}</p>}
            {resource.department && <p>Department: {resource.department}</p>}
            {resource.type === 'Lab Equipment' && (
              <>
                {resource.equipmentType && <p>Equipment Type: {resource.equipmentType}</p>}
                {resource.usageInstructions && <p>Usage Instructions: {resource.usageInstructions}</p>}
                {resource.requiredTraining && <p>Required Training: {resource.requiredTraining}</p>}
                {resource.maintenanceSchedule && <p>Maintenance Schedule: {resource.maintenanceSchedule}</p>}
              </>
            )}
            {resource.type === 'Vehicle' && (
              <>
                {resource.fuelType && <p>Fuel Type: {resource.fuelType}</p>}
                {resource.bookingDuration && <p>Booking Duration: {resource.bookingDuration}</p>}
                {resource.assignedDriver && <p>Assigned Driver: {resource.assignedDriver}</p>}
                {resource.insuranceDetails && <p>Insurance Details: {resource.insuranceDetails}</p>}
              </>
            )}
            {resource.type === 'Workstation/Desk' && (
              <>
                {resource.monitorSize && <p>Monitor Size: {resource.monitorSize}</p>}
                <p>Ergonomic Chair: {resource.ergonomicChair ? 'Yes' : 'No'}</p>
                <p>Standing Desk: {resource.standingDesk ? 'Yes' : 'No'}</p>
                {resource.nearbyAmenities?.length > 0 && (
                  <p>Nearby Amenities: {resource.nearbyAmenities.join(', ')}</p>
                )}
              </>
            )}
            {resource.type === 'Training Room' && (
              <p>Catering Services: {resource.cateringServices ? 'Yes' : 'No'}</p>
            )}
            {resource.type === 'Sports Facility' && (
              <>
                <p>Equipment Rental: {resource.equipmentRental ? 'Yes' : 'No'}</p>
                {resource.instructorAvailability && (
                  <p>Instructor Availability: {resource.instructorAvailability}</p>
                )}
              </>
            )}
            {resource.type === 'Auditorium/Event Hall' && (
              <>
                <p>Event Support Staff: {resource.eventSupportStaff ? 'Yes' : 'No'}</p>
                {resource.stageEquipment?.length > 0 && (
                  <p>Stage Equipment: {resource.stageEquipment.join(', ')}</p>
                )}
                {resource.lightingSoundSystems?.length > 0 && (
                  <p>Lighting/Sound Systems: {resource.lightingSoundSystems.join(', ')}</p>
                )}
              </>
            )}
            {resource.type === 'Storage Space' && (
              <>
                {resource.size && <p>Size: {resource.size}</p>}
                {resource.securityLevel && <p>Security Level: {resource.securityLevel}</p>}
                {resource.temperatureControl && <p>Temperature Control: {resource.temperatureControl}</p>}
              </>
            )}
            {resource.type === 'Shared Equipment' && (
              <>
                {resource.accessPermissions?.length > 0 && (
                  <p>Access Permissions: {resource.accessPermissions.join(', ')}</p>
                )}
                {resource.usageQuotas && <p>Usage Quotas: {resource.usageQuotas}</p>}
                {resource.maintenanceSchedule && <p>Maintenance Schedule: {resource.maintenanceSchedule}</p>}
              </>
            )}
            <div className="mt-2 flex space-x-2">
              <Link
                to={`/resources/${resource._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              {user.role === 'Admin' && (
                <button
                  onClick={() => handleDelete(resource._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;