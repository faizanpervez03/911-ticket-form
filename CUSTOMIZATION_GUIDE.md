# 911 Form - Customization Guide

This guide shows you how to customize the form for your specific needs.

---

## 🎨 Customizing Tabs (Departments)

Edit [src/Pages/FormPage.jsx](src/Pages/FormPage.jsx) to change departments.

**Current tabs:**
```javascript
const tabs = ['Police', 'Rescue', 'PDMA', 'NHMA', 'Bolo'];
```

**To change them:**
```javascript
// Example: For different departments
const tabs = ['Police', 'Fire', 'Medical', 'Road Accident', 'Utilities'];

// Or for different cities
const tabs = ['Downtown', 'Midtown', 'Uptown', 'Suburbs', 'Airport'];
```

**Update icons:**
Edit [src/Components/TabNavigation.jsx](src/Components/TabNavigation.jsx):
```javascript
const tabIcons = {
  Police: FiShield,      // Change to any react-icons icon
  Rescue: FiTruck,       // Example: FiAlertTriangle
  PDMA: FiAlert,         // Example: FiAward
  NHMA: FiHome,          // Example: FiMap
  Bolo: FiList,          // Example: FiBell
};
```

Available icons from react-icons: FiAlertTriangle, FiAward, FiMap, FiBell, FiZap, FiHeart, FiUmbrella, etc.

---

## 📋 Customizing Case Nature Categories

Edit [src/Components/CaseNatureForm.jsx](src/Components/CaseNatureForm.jsx):

**Current options:**
```javascript
const caseNatures = [
  'Accident / Traffic Collision',
  'Assault / Violence',
  // ... more options
];
```

**Replace with your list:**
```javascript
const caseNatures = [
  'Road Accident',
  'Domestic Violence',
  'Robbery',
  'Medical Cardiac Arrest',
  'Building Fire',
  'Flood Emergency',
  'Electrical Hazard',
  'Gas Leak',
  'Structural Collapse',
];
```

---

## ✅ Customizing Disposition Types

Edit [src/Components/DispositionForm.jsx](src/Components/DispositionForm.jsx):

**Current options:**
```javascript
const dispositionOptions = [
  'Unit Dispatched',
  'Service Provided',
  'Referred to Other Agency',
  // ... more options
];
```

**Replace with your standard responses:**
```javascript
const dispositionOptions = [
  'Police Unit Sent',
  'Ambulance Dispatched',
  'Fire Department Called',
  'All Units Responding',
  'Caller Advised Self-Help',
  'Transfer to Specialist',
  'No Emergency Found',
  'Case Closed',
  'Escalated to Supervisor',
];
```

---

## 🎯 Customizing Form Fields

### Add fields to Caller Info (Step 1)

Edit [src/Components/CallInfoForm.jsx](src/Components/CallInfoForm.jsx):

```javascript
// Add new field in the formData state in FormPage.jsx
const [formData, setFormData] = useState({
  // ... existing fields
  callerEmail: '',           // NEW
  callerAge: '',             // NEW
  unitNumber: '',            // NEW
  buildingName: '',          // NEW
});

// Add new input field in the form
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Caller Email (Optional)
  </label>
  <input
    type="email"
    name="callerEmail"
    value={formData.callerEmail || ''}
    onChange={handleChange}
    placeholder="Enter email address"
    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg..."
  />
</div>
```

### Add fields to Case Nature (Step 2)

Add to [src/Components/CaseNatureForm.jsx](src/Components/CaseNatureForm.jsx):

```javascript
// New field for severity level
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Incident Severity
  </label>
  <select
    name="severity"
    value={formData.severity || ''}
    onChange={handleChange}
    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg..."
  >
    <option value="">Select severity...</option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    <option value="Critical">Critical</option>
  </select>
</div>
```

### Add fields to Disposition (Step 3)

Add to [src/Components/DispositionForm.jsx](src/Components/DispositionForm.jsx):

```javascript
// New field for officer/unit assigned
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Officer/Unit ID Assigned
  </label>
  <input
    type="text"
    name="assignedUnit"
    value={formData.assignedUnit || ''}
    onChange={handleChange}
    placeholder="e.g., Unit-101, Officer-456"
    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg..."
  />
</div>
```

---

## 🎨 Customizing Colors & Styling

### Change Primary Brand Color

Replace `blue` colors throughout with your brand color:

**In all components, change:**
```css
/* Instead of blue-600 */
bg-blue-600 hover:bg-blue-700 → bg-purple-600 hover:bg-purple-700

/* Color options: */
red, orange, amber, yellow, lime, green, emerald
teal, cyan, sky, blue, indigo, violet, purple, pink
```

### Change Sidebar Colors

Edit [src/Components/AgentSidebar.jsx](src/Components/AgentSidebar.jsx):

```javascript
// Change from slate to different color
<div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 ...">

// To your brand color
<div className="w-64 bg-gradient-to-b from-blue-900 to-blue-950 ...">
```

### Dark vs. Light Theme

Edit form backgrounds in each component's main form wrapper:
```javascript
// Instead of bg-white
<div className="bg-white rounded-lg shadow-lg p-8">

// You can use
<div className="bg-slate-50 rounded-lg shadow-lg p-8">  // Light gray
<div className="bg-gray-100 rounded-lg shadow-lg p-8"> // Light
```

---

## 📱 Adjusting Layout

### Make Sidebar narrower/wider

Edit [src/Components/AgentSidebar.jsx](src/Components/AgentSidebar.jsx):
```javascript
<div className="w-64 bg-gradient-to-b...">
// Change w-64 to:
// w-48 (narrower)
// w-72 (wider)
// w-80 (even wider)
```

### Change form max-width

Edit [src/Pages/FormPage.jsx](src/Pages/FormPage.jsx):
```javascript
<div className="max-w-4xl mx-auto p-8">
// Change max-w-4xl to:
// max-w-2xl (narrower)
// max-w-5xl (wider)
// max-w-7xl (very wide)
```

---

## 🔗 Adding Backend API Integration

### Modify handleFormSubmit in [src/Pages/FormPage.jsx](src/Pages/FormPage.jsx)

**Currently (Mock Submission):**
```javascript
const handleFormSubmit = () => {
  setIsLoading(true);
  setTimeout(() => {
    console.log('Form Submitted:', {...});
    // Reset form...
  }, 1000);
};
```

**With Real API:**
```javascript
const handleFormSubmit = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('https://your-api.com/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // If needed
      },
      body: JSON.stringify({
        agentName,
        department: activeTab,
        ticketData: formData,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error('Submission failed');
    
    const data = await response.json();
    console.log('Ticket ID:', data.ticketId);
    
    // Reset form after successful submission
    setTimeout(() => {
      setCurrentStep(1);
      setFormData({ /* reset */ });
      setIsLoading(false);
    }, 1500);
  } catch (error) {
    console.error('Error:', error);
    // Show error message to user
    setIsLoading(false);
  }
};
```

---

## 🔐 Adding Authentication

### Modify agent login to verify credentials

Edit `handleAgentSubmit` in [src/Pages/FormPage.jsx](src/Pages/FormPage.jsx):

```javascript
const handleAgentSubmit = async (name) => {
  setIsLoading(true);
  try {
    // Call authentication API
    const response = await fetch('https://your-api.com/agents/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentName: name })
    });

    if (!response.ok) throw new Error('Invalid agent credentials');
    
    const data = await response.json();
    setAgentName(data.agentName);
    setCurrentStep(1);
    setIsLoading(false);
  } catch (error) {
    console.error('Login failed:', error);
    // Show error to user
    setIsLoading(false);
  }
};
```

---

## 📊 Customizing Summary Section

Edit [src/Components/DispositionForm.jsx](src/Components/DispositionForm.jsx):

```javascript
{/* Summary Section */}
<div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
  <h3 className="font-semibold text-slate-900 mb-4">Incident Summary</h3>
  <div className="space-y-2 text-sm text-slate-700">
    <p><span className="font-semibold">Caller:</span> {formData.callerName}</p>
    
    {/* Add custom fields */}
    <p><span className="font-semibold">Email:</span> {formData.callerEmail}</p>
    <p><span className="font-semibold">Severity:</span> {formData.severity}</p>
    <p><span className="font-semibold">Unit Assigned:</span> {formData.assignedUnit}</p>
  </div>
</div>
```

---

## 🚀 Common Customizations Checklist

- [ ] Change department tabs to match your organization
- [ ] Update case nature categories
- [ ] Modify disposition types  
- [ ] Add custom fields
- [ ] Change colors to match branding
- [ ] Adjust form field validation
- [ ] Connect to backend API
- [ ] Add authentication
- [ ] Test all form flows
- [ ] Deploy to production

---

## 📝 Environmental Variables (For Future)

Create a `.env` file in the root:

```bash
VITE_API_URL=https://your-api.com
VITE_API_KEY=your-api-key
VITE_ENVIRONMENT=production
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🆘 Need Help?

For implementation of specific customizations:
1. Identify which file needs changes
2. Follow the examples above
3. Test changes in development: `npm run dev`
4. Build and verify: `npm run build`

---

**Happy Customizing! 🎉**
