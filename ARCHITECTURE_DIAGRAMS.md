# 911 Form - System Architecture & Flow Diagrams

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      App.jsx (Root)                        │ │
│  └─────────────────────────┬──────────────────────────────────┘ │
│                            │                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      FormPage.jsx                          │ │
│  │  (Main Container - State Management & Logic)              │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │ State: agentName, currentStep, activeTab, formData │  │ │
│  │  │ Handlers: Navigation, Validation, Submission       │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│           ↓                                          ↓            │
│  ┌──────────────────────┐            ┌──────────────────────┐  │
│  │ AgentNameInput.jsx   │            │ AgentSidebar.jsx     │  │
│  │ (Login Screen)       │            │ (Right Sidebar)      │  │
│  └──────────────────────┘            │ - Agent Info         │  │
│                                       │ - Status             │  │
│  ┌────────────────────────────────┐  │ - Logout             │  │
│  │ Main Form Rendering Section    │  └──────────────────────┘  │
│  │ ┌──────────────────────────┐   │                             │
│  │ │ TabNavigation.jsx        │   │                             │
│  │ │ (5 Department Tabs)      │   │                             │
│  │ └──────────────────────────┘   │                             │
│  │ ┌──────────────────────────┐   │                             │
│  │ │ FormStepper.jsx          │   │                             │
│  │ │ (Progress Indicator)     │   │                             │
│  │ └──────────────────────────┘   │                             │
│  │                                 │                             │
│  │ ┌─────────────────────────────┐ │                             │
│  │ │ {currentStep === 1 ?        │ │                             │
│  │ │   <CallInfoForm /> :        │ │                             │
│  │ │ currentStep === 2 ?         │ │                             │
│  │ │   <CaseNatureForm /> :      │ │                             │
│  │ │   <DispositionForm />}      │ │                             │
│  │ └─────────────────────────────┘ │                             │
│  └────────────────────────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
┌──────────────────────┐
│  Agent Logs In       │
│ (enters name)        │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│ FormPage shows       │
│ Main Form Layout     │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐        ┌─────────────────┐
│ Agent selects        │───────→│ formData state  │
│ Department Tab       │        │ updated with    │
└──────────┬───────────┘        │ activeTab       │
           │                    └─────────────────┘
           ↓
┌──────────────────────────────────┐
│ STEP 1: Caller Information       │
│ ┌──────────────────────────────┐ │
│ │ Name, Phone, Address...      │ │
│ │ Validation checked here      │ │
│ └──────────────────────────────┘ │
└──────────┬───────────────────────┘
           │ (Click Next)
           ↓
┌──────────────────────────────────┐
│ formData updated with Step 1 data│
│ currentStep set to 2             │
└──────────┬───────────────────────┘
           │
           ↓
┌──────────────────────────────────┐
│ STEP 2: Case Nature              │
│ ┌──────────────────────────────┐ │
│ │ Select type, Add description │ │
│ │ Validation checked here      │ │
│ └──────────────────────────────┘ │
└──────────┬───────────────────────┘
           │ (Click Next)
           ↓
┌──────────────────────────────────┐
│ formData updated with Step 2 data│
│ currentStep set to 3             │
└──────────┬───────────────────────┘
           │
           ↓
┌──────────────────────────────────┐
│ STEP 3: Disposition              │
│ ┌──────────────────────────────┐ │
│ │ Select resolution, Add notes │ │
│ │ Validation checked here      │ │
│ └──────────────────────────────┘ │
└──────────┬───────────────────────┘
           │ (Click Submit)
           ↓
┌──────────────────────────────────┐
│ Prepare submission data:         │
│ {                                │
│   agentName,                     │
│   activeTab,                     │
│   formData (all 12 fields),      │
│   submittedAt                    │
│ }                                │
└──────────┬───────────────────────┘
           │
           ↓
┌──────────────────────────────────┐
│ Show success screen              │
│ Generate Ticket ID               │
│ Display Summary                  │
└──────────┬───────────────────────┘
           │ (Auto-reset after 2s)
           ↓
┌──────────────────────────────────┐
│ Reset to Step 1                  │
│ Clear all formData               │
│ Ready for next call              │
└──────────────────────────────────┘
```

---

## 🔄 Component Interaction Map

```
                        ┌─────────────────┐
                        │   FormPage      │
                        │  (Main State)   │
                        └────────┬────────┘
                                 │
                   ┌─────────────┼─────────────┐
                   │             │             │
                   ↓             ↓             ↓
          ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
          │Agent Name    │ │Tab Nav       │ │Agent Sidebar │
          │Input.jsx     │ │.jsx          │ │.jsx          │
          └──────────────┘ └──────────────┘ │              │
                                            │ - Logout     │
                                            │ - Session    │
                    ┌──────────────────┐   │ - Logout     │
                    │  Form Stepper    │   └──────────────┘
                    │.jsx              │
                    └──────────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ↓             ↓             ↓
        ┌────────────┐ ┌──────────────┐ ┌──────────────┐
        │Call Info   │ │Case Nature   │ │Disposition   │
        │Form.jsx    │ │Form.jsx      │ │Form.jsx      │
        │            │ │              │ │              │
        │Step 1      │ │Step 2        │ │Step 3        │
        └────────────┘ └──────────────┘ │              │
                                        │ - Success    │
                                        │ - Submission │
                                        └──────────────┘
```

---

## 🎯 State Management Flow

```
INITIAL STATE
├── agentName: ''              (Empty until login)
├── currentStep: 1             (Form step)
├── activeTab: 'Police'        (Selected department)
├── isLoading: false           (Submission state)
└── formData: {
    ├── callerName: ''
    ├── callerNumber: ''
    ├── alternativeNumber: ''
    ├── address: ''
    ├── nearestLocation: ''
    ├── caseNature: ''
    ├── description: ''
    ├── additionalInfo: ''
    ├── personsInvolved: ''
    ├── disposition: ''
    ├── closingNotes: ''
    ├── followUpActions: ''
    └── priorityLevel: ''
}

AFTER AGENT LOGIN
└── agentName: 'John Smith'    (Logged in agent)
    
AFTER SELECTING TAB
└── activeTab: 'Rescue'        (Department changed)

AFTER FILLING STEP 1
└── formData.callerName: 'Jane Doe'
    formData.callerNumber: '555-1234'
    ... (other step 1 fields)
    
AFTER FILLING STEP 2
└── formData.caseNature: 'Medical Emergency'
    formData.description: '...'
    ... (other step 2 fields)
    
AFTER FILLING STEP 3
└── formData.disposition: 'Unit Dispatched'
    formData.closingNotes: '...'
    ... (other step 3 fields)
    
AFTER SUBMISSION
└── Shows success screen
    Then resets to initial state
```

---

## 📋 Form Field Hierarchy

```
FORM STRUCTURE
│
├─ STEP 1: CALLER INFORMATION
│  ├─ Caller Name * (required)
│  ├─ Phone Number * (required, validated)
│  ├─ Alternative Number (optional)
│  ├─ Address * (required)
│  └─ Nearest Location * (required)
│     └─ [Next Button] → Step 2
│
├─ STEP 2: CASE NATURE & DETAILS
│  ├─ Case Nature * (required, 14 categories)
│  │  ├─ Accident / Traffic Collision
│  │  ├─ Assault / Violence
│  │  ├─ Robbery / Theft
│  │  ├─ Medical Emergency
│  │  ├─ Fire / Explosion
│  │  ├─ Domestic Violence
│  │  ├─ Mental Health Crisis
│  │  ├─ Missing Person
│  │  ├─ Suspicious Activity
│  │  ├─ Drug Related
│  │  ├─ Public Disturbance
│  │  ├─ Harassment / Threats
│  │  ├─ Burglary / Breaking & Entering
│  │  └─ Other Emergency
│  ├─ Incident Description * (required)
│  ├─ Additional Information (optional)
│  └─ Persons Involved (optional)
│     ├─ [Back Button] → Step 1
│     └─ [Next Button] → Step 3
│
└─ STEP 3: DISPOSITION
   ├─ Disposition * (required, 9 options)
   │  ├─ Unit Dispatched
   │  ├─ Service Provided
   │  ├─ Referred to Other Agency
   │  ├─ No Service Required
   │  ├─ Unable to Locate
   │  ├─ Duplicate Report
   │  ├─ Caller Refused Service
   │  ├─ Incomplete Information
   │  └─ Follow-up Required
   ├─ Closing Notes * (required)
   ├─ Follow-up Actions (optional)
   ├─ Priority Level (optional)
   │  ├─ Low
   │  ├─ Medium
   │  ├─ High
   │  └─ Critical
   ├─ Incident Summary (review section)
   ├─ [Back Button] → Step 2
   └─ [Submit Button] → Success Screen
```

---

## 🔀 Navigation Flow Diagram

```
START
   │
   ↓
LOGIN SCREEN
(AgentNameInput)
   │
   ├─ Valid Name? ─ Yes ─→ Show Main Form ─┐
   │                                        │
   └─ Invalid?                              │
      (too short/empty)                     │
      └─→ Show Error ─────────────→ Wait for input
                                           │
                                           ↓
                                    SELECT DEPARTMENT
                                    (TabNavigation)
                                           │
                                           ↓
                                    STEP 1: Caller Info
                                    (CallInfoForm)
                                           │
                                    ┌─────┴─────┐
                                    │           │
                                    ↓ (Next)    ↓ (Error)
                                  STEP 2      Show Error
                                    ↓          ↑
                                    └──────────┘
                                           │
                                    ↓ (Next/Valid)
                                    STEP 2: Case Nature
                                    (CaseNatureForm)
                                           │
                                    ┌─────┴─────┐
                                    │           │
                                    ↓ (Next)    ↓ (Error)
                                  STEP 3      Show Error
                                    ↓          ↑
                                    └──────────┘
                                           │
                                    ↓ (Next/Valid)
                                    STEP 3: Disposition
                                    (DispositionForm)
                                           │
                                    ┌─────┴─────┐
                                    │           │
                                    ↓ (Submit)  ↓ (Error)
                                  SUCCESS     Show Error
                                 SCREEN        ↑
                                    │          │
                                    └──────────┘
                                           │
                                    ↓ (Auto-Reset)
                                    BACK TO STEP 1
                                    (Ready for next call)
                                           │
                                    ┌──────┴──────┐
                                    │             │
                                    ↓ (Continue)  ↓ (Logout)
                                    Fill Next    LOGIN
                                    Call         SCREEN
```

---

## 💾 Form Submission Schema

```javascript
// Data sent to backend (example)
{
  // Session Information
  agentName: "John Smith",
  department: "Police",
  ticketId: "911-1741532000123",
  createdAt: "2026-03-09T10:30:00Z",
  
  // STEP 1: Caller Information
  callerName: "Jane Doe",
  callerNumber: "+1-555-123-4567",
  alternativeNumber: "+1-555-987-6543",
  address: "123 Main Street, Apt 4B, Downtown City",
  nearestLocation: "Near Central Hospital",
  
  // STEP 2: Case Nature & Details
  caseNature: "Medical Emergency",
  description: "Caller reports chest pain and difficulty breathing",
  additionalInfo: "Patient is alert and conscious",
  personsInvolved: 1,
  
  // STEP 3: Disposition & Resolution
  disposition: "Unit Dispatched",
  closingNotes: "Ambulance Unit 5 sent to location, ETA 4 minutes",
  followUpActions: "Monitor patient until arrival, keep line open",
  priorityLevel: "High"
}
```

---

## 🎨 UI Component Hierarchy

```
App
└── FormPage
    ├── (if not agentName)
    │   └── AgentNameInput
    │       └── Form (w/ validation)
    │
    └── (if agentName)
        ├── AgentSidebar
        │   ├── Avatar
        │   ├── Status Indicator
        │   ├── Session Info
        │   └── Logout Button
        │
        └── Main Content
            ├── Header
            │   ├── Title
            │   └── Department Display
            │
            ├── TabNavigation
            │   ├── Police Tab
            │   ├── Rescue Tab
            │   ├── PDMA Tab
            │   ├── NHMA Tab
            │   └── Bolo Tab
            │
            ├── FormStepper
            │   ├── Step 1 Indicator
            │   ├── Progress Line
            │   ├── Step 2 Indicator
            │   ├── Progress Line
            │   └── Step 3 Indicator
            │
            └── Form Container (conditional)
                ├── (Step 1)
                │   └── CallInfoForm
                │       ├── Name Input
                │       ├── Phone Input
                │       ├── Alt Phone Input
                │       ├── Address Textarea
                │       ├── Location Input
                │       └── Next Button
                │
                ├── (Step 2)
                │   └── CaseNatureForm
                │       ├── Category Buttons (14x)
                │       ├── Description Textarea
                │       ├── Additional Info
                │       ├── Persons Count
                │       ├── Back/Next Buttons
                │
                └── (Step 3)
                    └── DispositionForm
                        ├── Disposition Buttons (9x)
                        ├── Closing Notes
                        ├── Follow-up Actions
                        ├── Priority Selection
                        ├── Summary Section
                        ├── Back/Submit Buttons
                        │
                        └── (After Submit)
                            ├── Success Icon
                            ├── Confirmation Message
                            ├── Ticket Summary
                            └── Auto-reset
```

---

## 🔐 Validation Flow

```
USER INPUT → VALIDATION CHECK
                   │
        ┌──────────┼──────────┐
        │          │          │
        ↓          ↓          ↓
     Valid      Invalid    No Input
        │          │          │
        ↓          ↓          ↓
   Allow Input  Show Error  Disable Submit
   Show Success
        │          │          │
        └──────────┼──────────┘
                   ↓
         Continue to Next Step
         or Submit Form
```

---

**All diagrams represent the production-ready 911 form system architecture.**
