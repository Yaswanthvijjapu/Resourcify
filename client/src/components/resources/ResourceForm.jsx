import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { createResource } from '../../services/api';

const ResourceForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Meeting Room',
    location: '',
    capacity: '',
    features: '',
    availability: '',
    images: '',
    description: '',
    requiresApproval: true,
    department: '',
    equipmentType: '',
    usageInstructions: '',
    requiredTraining: '',
    maintenanceSchedule: '',
    fuelType: '',
    bookingDuration: '',
    assignedDriver: '',
    insuranceDetails: '',
    monitorSize: '',
    ergonomicChair: false,
    standingDesk: false,
    nearbyAmenities: '',
    cateringServices: false,
    eventSupportStaff: false,
    stageEquipment: '',
    lightingSoundSystems: '',
    size: '',
    securityLevel: '',
    temperatureControl: '',
    equipmentRental: false,
    instructorAvailability: '',
    accessPermissions: '',
    usageQuotas: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData };
      if (data.features) data.features = data.features.split(',').map((f) => f.trim());
      if (data.images) data.images = data.images.split(',').map((i) => i.trim());
      if (data.nearbyAmenities) data.nearbyAmenities = data.nearbyAmenities.split(',').map((a) => a.trim());
      if (data.stageEquipment) data.stageEquipment = data.stageEquipment.split(',').map((s) => s.trim());
      if (data.lightingSoundSystems) data.lightingSoundSystems = data.lightingSoundSystems.split(',').map((l) => l.trim());
      if (data.accessPermissions) data.accessPermissions = data.accessPermissions.split(',').map((p) => p.trim());
      if (data.capacity) data.capacity = Number(data.capacity);
      await createResource(data);
      setSuccess('Resource created successfully');
      setFormData({
        name: '',
        type: 'Meeting Room',
        location: '',
        capacity: '',
        features: '',
        availability: '',
        images: '',
        description: '',
        requiresApproval: true,
        department: '',
        equipmentType: '',
        usageInstructions: '',
        requiredTraining: '',
        maintenanceSchedule: '',
        fuelType: '',
        bookingDuration: '',
        assignedDriver: '',
        insuranceDetails: '',
        monitorSize: '',
        ergonomicChair: false,
        standingDesk: false,
        nearbyAmenities: '',
        cateringServices: false,
        eventSupportStaff: false,
        stageEquipment: '',
        lightingSoundSystems: '',
        size: '',
        securityLevel: '',
        temperatureControl: '',
        equipmentRental: false,
        instructorAvailability: '',
        accessPermissions: '',
        usageQuotas: '',
      });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create resource');
      setSuccess('');
    }
  };

  if (user.role !== 'Admin') return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Create Resource</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            >
              <option value="Meeting Room">Meeting Room</option>
              <option value="Lab Equipment">Lab Equipment</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Workstation/Desk">Workstation/Desk</option>
              <option value="Training Room">Training Room</option>
              <option value="Sports Facility">Sports Facility</option>
              <option value="Auditorium/Event Hall">Auditorium/Event Hall</option>
              <option value="Storage Space">Storage Space</option>
              <option value="Shared Equipment">Shared Equipment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="e.g., Projector,Whiteboard"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="e.g., 9am-6pm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Images (comma-separated URLs)</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Requires Approval</label>
            <input
              type="checkbox"
              name="requiresApproval"
              checked={formData.requiresApproval}
              onChange={handleChange}
              className="mt-1 p-2"
            />
          </div>
          {formData.type === 'Lab Equipment' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Equipment Type</label>
                <input
                  type="text"
                  name="equipmentType"
                  value={formData.equipmentType}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Usage Instructions</label>
                <textarea
                  name="usageInstructions"
                  value={formData.usageInstructions}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Required Training</label>
                <input
                  type="text"
                  name="requiredTraining"
                  value={formData.requiredTraining}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maintenance Schedule</label>
                <input
                  type="text"
                  name="maintenanceSchedule"
                  value={formData.maintenanceSchedule}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          )}
          {formData.type === 'Vehicle' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                <input
                  type="text"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Booking Duration</label>
                <input
                  type="text"
                  name="bookingDuration"
                  value={formData.bookingDuration}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assigned Driver</label>
                <input
                  type="text"
                  name="assignedDriver"
                  value={formData.assignedDriver}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Insurance Details</label>
                <input
                  type="text"
                  name="insuranceDetails"
                  value={formData.insuranceDetails}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          )}
          {formData.type === 'Workstation/Desk' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monitor Size</label>
                <input
                  type="text"
                  name="monitorSize"
                  value={formData.monitorSize}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ergonomic Chair</label>
                <input
                  type="checkbox"
                  name="ergonomicChair"
                  checked={formData.ergonomicChair}
                  onChange={handleChange}
                  className="mt-1 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Standing Desk</label>
                <input
                  type="checkbox"
                  name="standingDesk"
                  checked={formData.standingDesk}
                  onChange={handleChange}
                  className="mt-1 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nearby Amenities (comma-separated)</label>
                <input
                  type="text"
                  name="nearbyAmenities"
                  value={formData.nearbyAmenities}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          )}
          {formData.type === 'Training Room' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Catering Services</label>
                <input
                  type="checkbox"
                  name="cateringServices"
                  checked={formData.cateringServices}
                  onChange={handleChange}
                  className="mt-1 p-2"
                />
              </div>
            </>
          )}
          {formData.type === 'Sports Facility' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Equipment Rental</label>
                <input
                  type="checkbox"
                  name="equipmentRental"
                  checked={formData.equipmentRental}
                  onChange={handleChange}
                  className="mt-1 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor Availability</label>
                <input
                  type="text"
                  name="instructorAvailability"
                  value={formData.instructorAvailability}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          )}
          {formData.type === 'Auditorium/Event Hall' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Support Staff</label>
                <input
                  type="checkbox"
                  name="eventSupportStaff"
                  checked={formData.eventSupportStaff}
                  onChange={handleChange}
                  className="mt-1 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stage Equipment (comma-separated)</label>
                <input
                  type="text"
                  name="stageEquipment"
                  value={formData.stageEquipment}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lighting/Sound Systems (comma-separated)</label>
                <input
                  type="text"
                  name="lightingSoundSystems"
                  value={formData.lightingSoundSystems}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          )}
          {formData.type === 'Storage Space' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Size (sq. ft.)</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Security Level</label>
                <input
                  type="text"
                  name="securityLevel"
                  value={formData.securityLevel}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Temperature Control</label>
                <input
                  type="text"
                  name="temperatureControl"
                  value={formData.temperatureControl}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          )}
          {formData.type === 'Shared Equipment' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Access Permissions (comma-separated)</label>
                <input
                  type="text"
                  name="accessPermissions"
                  value={formData.accessPermissions}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Usage Quotas</label>
                <input
                  type="text"
                  name="usageQuotas"
                  value={formData.usageQuotas}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maintenance Schedule</label>
                <input
                  type="text"
                  name="maintenanceSchedule"
                  value={formData.maintenanceSchedule}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Resource
        </button>
      </form>
    </div>
  );
};

export default ResourceForm;