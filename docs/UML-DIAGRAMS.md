# System Architecture & UML Diagrams
## PT Surya Multi Cemerlang - Production Report System

## Table of Contents
1. [Entity Relationship Diagram (ERD)](#entity-relationship-diagram)
2. [Use Case Diagram](#use-case-diagram)
3. [System Architecture](#system-architecture)
4. [Database Schema Visual](#database-schema-visual)

---

## Entity Relationship Diagram

### Simplified ERD - Core Entities

```mermaid
erDiagram
    USERS ||--o{ PRODUCTION_REPORTS : "creates/updates/approves"
    PRODUCTION_REPORTS ||--|{ PRODUCTION_REPORT_DETAILS : "contains"
    PRODUCTION_REPORTS }o--|| SHIFTS : "has"
    PRODUCTION_REPORTS }o--|| LINES : "uses"
    PRODUCTION_REPORT_DETAILS }o--|| MOTIFS : "has"
    PRODUCTION_REPORT_DETAILS }o--|| DIMENSIONS : "has"
    USERS ||--o{ ACTIVITY_LOGS : "performs"
    USERS }o--o{ ROLES : "has"
    ROLES }o--o{ PERMISSIONS : "has"
    
    USERS {
        int id PK
        string name
        string email UK
        string password
        boolean is_active
    }
    
    PRODUCTION_REPORTS {
        int id PK
        string report_number UK
        date production_date
        int shift_id FK
        int line_id FK
        enum status
        int created_by FK
        int approved_by FK
    }
    
    PRODUCTION_REPORT_DETAILS {
        int id PK
        int production_report_id FK
        int motif_id FK
        int dimension_id FK
        int target_quantity
        int actual_quantity
        int ng_quantity
    }
    
    LINES {
        int id PK
        string name UK
        boolean is_active
    }
    
    MOTIFS {
        int id PK
        string name
        string code UK
        boolean is_active
    }
    
    DIMENSIONS {
        int id PK
        string name
        decimal width
        decimal height
    }
    
    SHIFTS {
        int id PK
        string name
        time start_time
        time end_time
    }
    
    ROLES {
        int id PK
        string name UK
    }
    
    PERMISSIONS {
        int id PK
        string name UK
    }
    
    ACTIVITY_LOGS {
        int id PK
        int user_id FK
        string action
        json properties
    }
```

---

## Use Case Diagram

### System Actors and Use Cases

```mermaid
%%{init: {'theme':'base'}}%%
graph LR
    subgraph System["Production Report System"]
        subgraph Auth["Authentication"]
            Login[Login]
            Logout[Logout]
            Profile[Manage Profile]
        end
        
        subgraph Reports["Production Reports"]
            CreateReport[Create Report]
            ViewReports[View Reports]
            EditReport[Edit Report]
            DeleteReport[Delete Report]
            SubmitApproval[Submit for Approval]
            ApproveReport[Approve/Reject Report]
            AddDetails[Add Report Details]
        end
        
        subgraph Dashboard["Dashboard & Analytics"]
            ViewDashboard[View Dashboard]
            ViewStats[View Statistics]
            ViewCharts[View Trend Charts]
        end
        
        subgraph Recap["Recap & Export"]
            ViewRecap[View Production Recap]
            FilterData[Filter by Date/Line/Motif]
            ExportExcel[Export to Excel]
            ExportPDF[Export to PDF]
        end
        
        subgraph Master["Master Data"]
            ManageLines[Manage Lines]
            ManageMotifs[Manage Motifs]
            ManageDimensions[Manage Dimensions]
            ManageShifts[Manage Shifts]
        end
        
        subgraph Users["User Management"]
            ManageUsers[Manage Users]
            AssignRoles[Assign Roles]
        end
        
        subgraph Audit["Monitoring"]
            ViewLogs[View Activity Logs]
            TrackChanges[Track Changes]
        end
    end
    
    Admin((Admin))
    Supervisor((Supervisor))
    Operator((Operator))
    
    Admin --> Login
    Admin --> CreateReport
    Admin --> ApproveReport
    Admin --> ViewDashboard
    Admin --> ManageLines
    Admin --> ManageUsers
    Admin --> ViewLogs
    Admin --> ExportExcel
    
    Supervisor --> Login
    Supervisor --> CreateReport
    Supervisor --> ApproveReport
    Supervisor --> ViewDashboard
    Supervisor --> ExportExcel
    Supervisor --> ViewLogs
    
    Operator --> Login
    Operator --> CreateReport
    Operator --> ViewReports
    Operator --> ViewDashboard
    
    style Admin fill:#ff6b6b
    style Supervisor fill:#4ecdc4
    style Operator fill:#95e1d3
```

---

## System Architecture

### Layered Architecture

```mermaid
graph TB
    subgraph "Presentation Layer"
        UI[React 18 + Inertia.js]
        TW[TailwindCSS + Glassmorphism]
    end
    
    subgraph "Application Layer"
        Controllers[Laravel Controllers]
        Middleware[Middleware & Auth]
        Validation[Form Validation]
    end
    
    subgraph "Business Logic Layer"
        Models[Eloquent Models]
        Services[Business Services]
        Events[Events & Listeners]
    end
    
    subgraph "Data Access Layer"
        ORM[Eloquent ORM]
        QueryBuilder[Query Builder]
        Migrations[Migrations]
    end
    
    subgraph "Database Layer"
        MySQL[(MySQL Database)]
    end
    
    subgraph "External Services"
        Excel[Excel Export]
        PDF[PDF Export]
        Mail[Email Notifications]
    end
    
    UI --> Controllers
    TW --> UI
    Controllers --> Middleware
    Controllers --> Validation
    Controllers --> Models
    Models --> Services
    Services --> Events
    Models --> ORM
    ORM --> QueryBuilder
    QueryBuilder --> MySQL
    Migrations --> MySQL
    Services --> Excel
    Services --> PDF
    Services --> Mail
    
    style UI fill:#61dafb
    style Controllers fill:#ff2d20
    style Models fill:#f39c12
    style MySQL fill:#00758f
```

---

## Database Schema Visual

### Core Tables Relationships

```mermaid
graph TB
    subgraph "Core Business"
        PR[Production Reports<br/>Main transaction table]
        PRD[Production Report Details<br/>Detail records]
        
        PR -->|1:N| PRD
    end
    
    subgraph "Master Data"
        Lines[Lines<br/>Production lines]
        Motifs[Motifs<br/>Product designs]
        Dimensions[Dimensions<br/>Product sizes]
        Shifts[Shifts<br/>Work schedules]
        
        Lines -->|1:N| PR
        Shifts -->|1:N| PR
        Motifs -->|1:N| PRD
        Dimensions -->|1:N| PRD
    end
    
    subgraph "User Management"
        Users[Users<br/>System users]
        Roles[Roles<br/>Admin, Supervisor, etc]
        Permissions[Permissions<br/>Access rights]
        
        Users -->|N:M| Roles
        Roles -->|N:M| Permissions
        Users -->|1:N| PR
    end
    
    subgraph "Audit"
        Logs[Activity Logs<br/>Audit trail]
        
        Users -->|1:N| Logs
    end
    
    style PR fill:#3498db
    style PRD fill:#3498db
    style Users fill:#e74c3c
    style Roles fill:#e74c3c
    style Lines fill:#2ecc71
    style Motifs fill:#2ecc71
```

---

## Data Flow Diagram

### Production Report Creation Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as React UI
    participant Controller as Laravel Controller
    participant Model as Eloquent Model
    participant DB as MySQL Database
    participant Log as Activity Logger
    
    User->>UI: Fill report form
    UI->>UI: Client-side validation
    User->>UI: Submit form
    UI->>Controller: POST /reports
    Controller->>Controller: Validate request
    Controller->>Model: Create report
    Model->>DB: INSERT production_reports
    DB-->>Model: Report ID
    Model->>DB: INSERT production_report_details
    DB-->>Model: Success
    Model-->>Controller: Report object
    Controller->>Log: Log activity
    Log->>DB: INSERT activity_logs
    Controller-->>UI: Success response
    UI-->>User: Show success message
    UI->>UI: Redirect to report details
```

---

## Approval Workflow

### Report Status State Machine

```mermaid
stateDiagram-v2
    [*] --> Draft: Create Report
    Draft --> Pending: Submit for Approval
    Draft --> [*]: Delete (Operator/Admin only)
    
    Pending --> Approved: Supervisor/Admin Approves
    Pending --> Rejected: Supervisor/Admin Rejects
    Pending --> Draft: Recall Submission
    
    Rejected --> Draft: Edit & Resubmit
    Rejected --> [*]: Delete (Admin only)
    
    Approved --> [*]: Archive/Reference
    
    note right of Draft
        Editable by creator
        Can add/edit details
        Can delete
    end note
    
    note right of Pending
        Read-only for creator
        Awaiting approval
        Can be recalled
    end note
    
    note right of Approved
        Read-only for all
        Cannot be edited
        Permanent record
    end note
    
    note right of Rejected
        Visible to creator
        Shows rejection reason
        Can be revised
    end note
```

---

## Component Architecture

### Frontend Components

```mermaid
graph TB
    subgraph "Layouts"
        AdminLayout[Admin Layout]
        PublicLayout[Public Layout]
    end
    
    subgraph "Pages"
        Dashboard[Dashboard Page]
        Reports[Reports Page]
        Recap[Recap Page]
        Login[Login Page]
        Landing[Landing Page]
    end
    
    subgraph "Components"
        Input[Input Components]
        Table[Table Components]
        Chart[Chart Components]
        Modal[Modal Components]
        Hero[Hero Section]
    end
    
    AdminLayout --> Dashboard
    AdminLayout --> Reports
    AdminLayout --> Recap
    PublicLayout --> Login
    PublicLayout --> Landing
    
    Dashboard --> Chart
    Dashboard --> Table
    Reports --> Table
    Reports --> Modal
    Recap --> Table
    Login --> Input
    Landing --> Hero
    
    style AdminLayout fill:#667eea
    style PublicLayout fill:#764ba2
    style Dashboard fill:#f093fb
    style Reports fill:#4facfe
```

---

## Security Architecture

### Authentication & Authorization Flow

```mermaid
graph TB
    Start([User Access]) --> CheckAuth{Authenticated?}
    
    CheckAuth -->|No| LoginPage[Show Login Page]
    LoginPage --> ValidateCredentials{Valid Credentials?}
    ValidateCredentials -->|No| ShowError[Show Error]
    ShowError --> LoginPage
    ValidateCredentials -->|Yes| CreateSession[Create Session]
    
    CheckAuth -->|Yes| CheckPermission{Has Permission?}
    CreateSession --> CheckPermission
    
    CheckPermission -->|No| AccessDenied[403 Access Denied]
    CheckPermission -->|Yes| CheckRole{Check Role}
    
    CheckRole -->|Admin| AdminFeatures[Full Access]
    CheckRole -->|Supervisor| SupervisorFeatures[Limited Management]
    CheckRole -->|Operator| OperatorFeatures[Data Entry Only]
    
    AdminFeatures --> AllowAccess[Grant Access]
    SupervisorFeatures --> AllowAccess
    OperatorFeatures --> AllowAccess
    
    AllowAccess --> LogActivity[Log Activity]
    LogActivity --> End([Access Granted])
    
    style Start fill:#2ecc71
    style CheckAuth fill:#3498db
    style CheckPermission fill:#3498db
    style CheckRole fill:#3498db
    style AdminFeatures fill:#e74c3c
    style SupervisorFeatures fill:#f39c12
    style OperatorFeatures fill:#95a5a6
    style End fill:#2ecc71
```

---

## Performance Optimization

### Query Optimization Strategy

```mermaid
graph LR
    subgraph "Request"
        A[User Request]
    end
    
    subgraph "Optimization Layer"
        B[Route Cache]
        C[Config Cache]
        D[View Cache]
    end
    
    subgraph "Database Layer"
        E[Eager Loading]
        F[Index Usage]
        G[Query Builder]
        H[Aggregation]
    end
    
    subgraph "Response"
        I[Fast Response]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    
    style E fill:#2ecc71
    style F fill:#2ecc71
    style G fill:#2ecc71
    style H fill:#2ecc71
```

---

## Deployment Architecture

### Production Environment

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        Mobile[Mobile Browser]
    end
    
    subgraph "Web Server Layer"
        Nginx[Nginx Web Server]
        PHP[PHP-FPM 8.2]
    end
    
    subgraph "Application Layer"
        Laravel[Laravel Application]
        Queue[Queue Worker]
    end
    
    subgraph "Database Layer"
        MySQL[(MySQL 8.0)]
        Redis[(Redis Cache)]
    end
    
    subgraph "Storage Layer"
        FileStorage[File Storage]
        Logs[Application Logs]
    end
    
    Browser --> Nginx
    Mobile --> Nginx
    Nginx --> PHP
    PHP --> Laravel
    Laravel --> Queue
    Laravel --> MySQL
    Laravel --> Redis
    Laravel --> FileStorage
    Laravel --> Logs
    Queue --> MySQL
    
    style Nginx fill:#009639
    style Laravel fill:#ff2d20
    style MySQL fill:#00758f
    style Redis fill:#dc382d
```

---

## Summary

### System Metrics

| Metric | Value |
|--------|-------|
| **Total Tables** | 16 |
| **Core Entities** | 8 |
| **Use Cases** | 32 |
| **User Roles** | 4 (Admin, Supervisor, Operator, Viewer) |
| **Main Features** | 7 modules |
| **Technology Stack** | Laravel 11 + React 18 + MySQL |
| **Security Layers** | 3 (Authentication, Authorization, Audit) |

### Key Features Summary

1. ✅ **Multi-Role Authentication** - Secure role-based access
2. ✅ **Production Management** - Complete CRUD with approval workflow
3. ✅ **Real-time Dashboard** - Interactive charts and statistics
4. ✅ **Flexible Reporting** - Advanced filters and export capabilities
5. ✅ **Master Data Management** - Centralized configuration
6. ✅ **Activity Tracking** - Comprehensive audit trail
7. ✅ **Modern UI/UX** - Glassmorphism design with responsive layout

---

**Document Version:** 1.0.0  
**Last Updated:** December 30, 2025  
**System:** PT Surya Multi Cemerlang Production Report System  
**Prepared by:** Development Team
