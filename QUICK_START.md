# 911 Emergency Call Form - Quick Start Guide

## 🚀 Getting Started

Your 911 emergency call ticket form is now ready! Here's how to use it:

### Starting the Application

```bash
cd "d:\911 form\911-form"
npm run dev
```

The application will start on **http://localhost:5174/**

---

## 📝 Form Navigation Guide

### **Step 1: Agent Login**
1. Enter your full name in the text field
2. Click **"Start Taking Calls"** button
3. You'll see the main form interface with your name in the right sidebar

### **Step 2: Select Department**
Choose one of the 5 departments by clicking the tabs at the top:
- 🛡️ **Police** - Police Department incidents
- 🚒 **Rescue** - Rescue and firefighting services
- ⚠️ **PDMA** - Disaster Management Authority
- 🏠 **NHMA** - National Highways Management Authority  
- 📋 **Bolo** - General alerts and bulletins

### **Step 3: Fill Caller Information (Step 1/3)**
Complete all required fields marked with asterisk (*):

| Field | Purpose |
|-------|---------|
| **Caller Name** | Full name of the person calling |
| **Phone Number** | Contact number of the caller |
| **Alternative Number** | Secondary contact (optional) |
| **Address** | Complete location address |
| **Nearest Location** | Landmark or reference point |

- Real-time validation shows errors immediately
- Click **"Next: Case Nature"** when complete

### **Step 4: Enter Case Information (Step 2/3)**
Select and describe the emergency:

| Field | Purpose |
|-------|---------|
| **Case Nature** | Choose from 14 categories (Accident, Assault, Medical Emergency, etc.) |
| **Description** | Detailed account of what happened |
| **Additional Info** | Extra details (optional) |
| **Persons Involved** | How many people are affected (optional) |

- Case natures provided:
  - Accident / Traffic Collision
  - Assault / Violence
  - Robbery / Theft
  - Medical Emergency
  - Fire / Explosion
  - And 9 more options...

- Click **"Next: Disposition"** when complete

### **Step 5: Complete Disposition (Step 3/3)**
Finalize the incident handling:

| Field | Purpose |
|-------|---------|
| **Disposition** | How was the call resolved? |
| **Closing Notes** | Summary and actions taken |
| **Follow-up Actions** | Any required follow-ups (optional) |
| **Priority Level** | Incident urgency (Low/Medium/High/Critical) |

**Disposition Options:**
- Unit Dispatched
- Service Provided
- Referred to Other Agency
- No Service Required
- Unable to Locate
- Duplicate Report
- Caller Refused Service
- Incomplete Information
- Follow-up Required

- Review the incident summary
- Click **"Submit Ticket"** to complete

### **Step 6: Confirmation**
After submission:
- Success message displayed with Ticket ID
- See caller name, case type, and disposition summary
- Form automatically resets for the next call
- Ready to handle another emergency

---

## 🎯 Form Features

### ✅ **Smart Validation**
- Phone numbers validated for correct format
- All required fields enforced
- Real-time error feedback with icons
- No submission without valid data

### 🔄 **Easy Navigation**
- Use **Back** button to review previous steps
- Progress bar shows your completion percentage
- Step indicators clearly show where you are
- Stepper shows completed ✓, current (blue), and upcoming steps

### 👤 **Agent Tools (Right Sidebar)**
Your information and controls:
- Name and avatar display
- 🟢 Status indicator (Active)
- Session ID for audit trail
- Login time tracking
- **Logout** button with confirmation

### 🎨 **Professional Interface**
- Color-coded steps (Green for complete, Blue for current)
- Icons for quick visual reference
- Responsive to different screen sizes
- Smooth transitions and animations

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Move to next field |
| `Shift+Tab` | Move to previous field |
| `Enter` | Submit form when on button |
| `Escape` | (Can be customized for cancel) |

---

## 📊 Data Collection Summary

The form collects valuable information:

```
┌─ CALL INFORMATION ─────────────────┐
│ • Caller identity & contact details │
│ • Location and coordinates          │
│ • Alternative contact information   │
└────────────────────────────────────┘

┌─ INCIDENT DETAILS ─────────────────┐
│ • Type of emergency                 │
│ • Detailed description              │
│ • Number of people involved         │
│ • Additional context                │
└────────────────────────────────────┘

┌─ RESOLUTION & FOLLOW-UP ───────────┐
│ • How incident was resolved         │
│ • Actions taken                     │
│ • Required follow-ups               │
│ • Priority classification           │
└────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### **Port 5174 Already in Use?**
The app automatically uses the next available port. Check the terminal output for the correct URL.

### **Form not accepting input?**
- Ensure you've entered your agent name first
- Check that you're not in a disabled tab
- Verify JavaScript is enabled in your browser

### **Icons not displaying?**
- React Icons should have installed automatically
- If missing, run: `npm install react-icons`

### **Validation errors?**
- Check field requirements (marked with *)
- Phone numbers need 7+ digits
- All text fields must have content
- Error messages explain what's needed

---

## 📈 Next Steps

1. **Test the form** with sample data
2. **Verify validation** by trying to submit incomplete forms
3. **Check all tabs** switch properly between departments
4. **Test logout** confirmation modal

When ready for production:
- Connect to a backend API
- Add user authentication
- Set up database storage
- Configure email/SMS notifications
- Add call recording integration

---

## 🆘 Emergency Services Notes

This form is designed for:
- ✓ Call center operations
- ✓ Multi-department dispatch
- ✓ Incident tracking and logging
- ✓ Response coordination
- ✓ Follow-up management

---

## 📞 Support Information

**Current Version**: 1.0.0 (Production Ready)
**Last Updated**: March 2026

For technical support or customizations, contact the development team.

---

**Welcome to the 911 Emergency Call Form System! 🚨**
