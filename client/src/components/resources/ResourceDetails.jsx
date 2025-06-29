import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getResourceById, updateResource } from '../../services/api';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';

const ResourceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await getResourceById(id);
        const data = response.data;
        setResource(data);
        setFormData({
          name: data.name,
          type: data.type,
          location: data.location || '',
          capacity: data.capacity || '',
          features: data.features?.join(', ') || '',
          availability: data.availability || '',
          images: data.images?.join(', ') || '',
          description: data.description || '',
          requiresApproval: data.requiresApproval || false,
          department: data.department || '',
          equipmentType: data.equipmentType || '',
          usageInstructions: data.usageInstructions || '',
          requiredTraining: data.requiredTraining || '',
          maintenanceSchedule: data.maintenanceSchedule || '',
          fuelType: data.fuelType || '',
          bookingDuration: data.bookingDuration || '',
          assignedDriver: data.assignedDriver || '',
          insuranceDetails: data.insuranceDetails || '',
          monitorSize: data.monitorSize || '',
          ergonomicChair: data.ergonomicChair || false,
          standingDesk: data.standingDesk || false,
          nearbyAmenities: data.nearbyAmenities?.join(', ') || '',
          cateringServices: data.cateringServices || false,
          eventSupportStaff: data.eventSupportStaff || false,
          stageEquipment: data.stageEquipment?.join(', ') || '',
          lightingSoundSystems: data.lightingSoundSystems?.join(', ') || '',
          size: data.size || '',
          securityLevel: data.securityLevel || '',
          temperatureControl: data.temperatureControl || '',
          equipmentRental: data.equipmentRental || false,
          instructorAvailability: data.instructorAvailability || '',
          accessPermissions: data.accessPermissions?.join(', ') || '',
          usageQuotas: data.usageQuotas || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch resource');
      }
    };
    fetchResource();
  }, [id]);

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
      await updateResource(id, data);
      setSuccess('Resource updated successfully');
      setResource({ ...resource, ...data });
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update resource');
      setSuccess('');
    }
  };

  if (!resource) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <div className="p-6">
              {error ? <p className="text-red-500">{error}</p> : <p>Loading...</p>}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{resource.name}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {isEditing && user.role === 'Admin' ? (
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
                <div className="mt-4 flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Update Resource
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white p-4 rounded shadow">
                <p><strong>Type:</strong> {resource.type}</p>
                <p><strong>Description:</strong> {resource.description}</p>
                {resource.location && <p><strong>Location:</strong> {resource.location}</p>}
                {resource.capacity && <p><strong>Capacity:</strong> {resource.capacity}</p>}
                {resource.features?.length > 0 && (
                  <p><strong>Features:</strong> {resource.features.join(', ')}</p>
                )}
                {resource.availability && <p><strong>Availability:</strong> {resource.availability}</p>}
                {resource.department && <p><strong>Department:</strong> {resource.department}</p>}
                {resource.images?.length > 0 && (
                  <div>
                    <strong>Images:</strong>
                    <div className="flex space-x-2 mt-2">
                      {resource.images.map((url, index) => (
                        <img key={index} src={url} alt={resource.name} className="w-32 h-32 object-cover rounded" />
                      ))}
                    </div>
                  </div>
                )}
                {resource.type === 'Lab Equipment' && (
                  <>
                    {resource.equipmentType && <p><strong>Equipment Type:</strong> {resource.equipmentType}</p>}
                    {resource.usageInstructions && <p><strong>Usage Instructions:</strong> {resource.usageInstructions}</p>}
                    {resource.requiredTraining && <p><strong>Required Training:</strong> {resource.requiredTraining}</p>}
                    {resource.maintenanceSchedule && (
                      <p><strong>Maintenance Schedule:</strong> {resource.maintenanceSchedule}</p>
                    )}
                  </>
                )}
                {resource.type === 'Vehicle' && (
                  <>
                    {resource.fuelType && <p><strong>Fuel Type:</strong> {resource.fuelType}</p>}
                    {resource.bookingDuration && <p><strong>Booking Duration:</strong> {resource.bookingDuration}</p>}
                    {resource.assignedDriver && <p><strong>Assigned Driver:</strong> {resource.assignedDriver}</p>}
                    {resource.insuranceDetails && <p><strong>Insurance Details:</strong> {resource.insuranceDetails}</p>}
                  </>
                )}
                {resource.type === 'Workstation/Desk' && (
                  <>
                    {resource.monitorSize && <p><strong>Monitor Size:</strong> {resource.monitorSize}</p>}
                    <p><strong>Ergonomic Chair:</strong> {resource.ergonomicChair ? 'Yes' : 'No'}</p>
                    <p><strong>Standing Desk:</strong> {resource.standingDesk ? 'Yes' : 'No'}</p>
                    {resource.nearbyAmenities?.length > 0 && (
                      <p><strong>Nearby Amenities:</strong> {resource.nearbyAmenities.join(', ')}</p>
                    )}
                  </>
                )}
                {resource.type === 'Training Room' && (
                  <p><strong>Catering Services:</strong> {resource.cateringServices ? 'Yes' : 'No'}</p>
                )}
                {resource.type === 'Sports Facility' && (
                  <>
                    <p><strong>Equipment Rental:</strong> {resource.equipmentRental ? 'Yes' : 'No'}</p>
                    {resource.instructorAvailability && (
                      <p><strong>Instructor Availability:</strong> {resource.instructorAvailability}</p>
                    )}
                  </>
                )}
                {resource.type === 'Auditorium/Event Hall' && (
                  <>
                    <p><strong>Event Support Staff:</strong> {resource.eventSupportStaff ? 'Yes' : 'No'}</p>
                    {resource.stageEquipment?.length > 0 && (
                      <p><strong>Stage Equipment:</strong> {resource.stageEquipment.join(', ')}</p>
                    )}
                    {resource.lightingSoundSystems?.length > 0 && (
                      <p><strong>Lighting/Sound Systems:</strong> {resource.lightingSoundSystems.join(', ')}</p>
                    )}
                  </>
                )}
                {resource.type === 'Storage Space' && (
                  <>
                    {resource.size && <p><strong>Size:</strong> {resource.size}</p>}
                    {resource.securityLevel && <p><strong>Security Level:</strong> {resource.securityLevel}</p>}
                    {resource.temperatureControl && (
                      <p><strong>Temperature Control:</strong> {resource.temperatureControl}</p>
                    )}
                  </>
                )}
                {resource.type === 'Shared Equipment' && (
                  <>
                    {resource.accessPermissions?.length > 0 && (
                      <p><strong>Access Permissions:</strong> {resource.accessPermissions.join(', ')}</p>
                    )}
                    {resource.usageQuotas && <p><strong>Usage Quotas:</strong> {resource.usageQuotas}</p>}
                    {resource.maintenanceSchedule && (
                      <p><strong>Maintenance Schedule:</strong> {resource.maintenanceSchedule}</p>
                    )}
                  </>
                )}
                {user.role === 'Admin' && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Edit Resource
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResourceDetails;