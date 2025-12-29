# Entity Relationship Diagram (ERD)
## PT Surya Multi Cemerlang - Production Report System

### Database Schema

```mermaid
erDiagram
    users ||--o{ production_reports : "creates (created_by)"
    users ||--o{ production_reports : "updates (updated_by)"
    users ||--o{ production_reports : "approves (approved_by)"
    users ||--o{ activity_logs : "performs"
    users ||--o{ model_has_roles : "has"
    users ||--o{ model_has_permissions : "has"
    
    roles ||--o{ model_has_roles : "assigned to"
    roles ||--o{ role_has_permissions : "has"
    
    permissions ||--o{ model_has_permissions : "granted to"
    permissions ||--o{ role_has_permissions : "granted to"
    
    production_reports ||--|{ production_report_details : "contains"
    production_reports }o--|| shifts : "belongs to"
    production_reports }o--|| lines : "belongs to"
    
    production_report_details }o--|| motifs : "belongs to"
    production_report_details }o--|| dimensions : "belongs to"
    
    users {
        bigint id PK
        string name
        string email UK
        timestamp email_verified_at
        string password
        boolean is_active
        string remember_token
        timestamp created_at
        timestamp updated_at
    }
    
    roles {
        bigint id PK
        string name UK
        string guard_name
        timestamp created_at
        timestamp updated_at
    }
    
    permissions {
        bigint id PK
        string name UK
        string guard_name
        timestamp created_at
        timestamp updated_at
    }
    
    model_has_roles {
        bigint role_id FK
        string model_type
        bigint model_id
    }
    
    model_has_permissions {
        bigint permission_id FK
        string model_type
        bigint model_id
    }
    
    role_has_permissions {
        bigint permission_id FK
        bigint role_id FK
    }
    
    production_reports {
        bigint id PK
        string report_number UK
        date production_date
        bigint shift_id FK
        bigint line_id FK
        text notes
        enum status "draft|pending|approved|rejected"
        bigint created_by FK
        bigint updated_by FK
        bigint approved_by FK
        text rejection_reason
        timestamp approved_at
        timestamp created_at
        timestamp updated_at
    }
    
    production_report_details {
        bigint id PK
        bigint production_report_id FK
        bigint motif_id FK
        bigint dimension_id FK
        integer target_quantity
        integer actual_quantity
        integer ng_quantity
        text notes
        timestamp created_at
        timestamp updated_at
    }
    
    lines {
        bigint id PK
        string name UK
        text description
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    motifs {
        bigint id PK
        string name
        string code UK
        text description
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    dimensions {
        bigint id PK
        string name
        decimal width
        decimal height
        decimal thickness
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    shifts {
        bigint id PK
        string name
        time start_time
        time end_time
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    activity_logs {
        bigint id PK
        bigint user_id FK
        string action
        string model_type
        bigint model_id
        text description
        json properties
        timestamp created_at
        timestamp updated_at
    }
    
    sessions {
        string id PK
        bigint user_id FK
        string ip_address
        text user_agent
        longtext payload
        integer last_activity
    }
    
    cache {
        string key PK
        text value
        integer expiration
    }
    
    password_reset_tokens {
        string email PK
        string token
        timestamp created_at
    }
```

---

## Table Descriptions

### Core Tables

#### 1. **users**
- Primary user management table
- Stores authentication and profile information
- Connected to roles and permissions via Spatie Permission
- Tracks user activity through activity_logs

**Key Relationships:**
- Creates production reports (created_by)
- Updates production reports (updated_by)
- Approves production reports (approved_by)
- Has roles and permissions

#### 2. **production_reports**
- Main transaction table for production reporting
- Tracks production by date, shift, and line
- Implements approval workflow (draft → pending → approved/rejected)
- Contains summary information for each production session

**Key Relationships:**
- Belongs to Shift (shift_id)
- Belongs to Line (line_id)
- Belongs to User (created_by, updated_by, approved_by)
- Has many ProductionReportDetails

#### 3. **production_report_details**
- Detail records for each production report
- Tracks specific motif and dimension combinations
- Records target, actual, and NG (Not Good) quantities
- Enables detailed production analysis

**Key Relationships:**
- Belongs to ProductionReport (production_report_id)
- Belongs to Motif (motif_id)
- Belongs to Dimension (dimension_id)

### Master Data Tables

#### 4. **lines**
- Production line master data
- Represents physical production lines in factory
- Used for resource allocation and tracking

#### 5. **motifs**
- Product motif/design master data
- Each ceramic product has a specific motif
- Includes code for identification

#### 6. **dimensions**
- Product dimension specifications
- Stores width, height, thickness measurements
- Example: 60x60, 50x50, 30x60, etc.

#### 7. **shifts**
- Work shift master data
- Defines shift schedule (Shift I, II, III)
- Includes start and end times

### Authorization Tables (Spatie Permission)

#### 8. **roles**
- Role definitions (Admin, Supervisor, Operator, Viewer)
- Used for role-based access control

#### 9. **permissions**
- Permission definitions for fine-grained access control
- Examples: create-report, approve-report, manage-users

#### 10. **model_has_roles**
- Pivot table linking users to roles
- Supports polymorphic relationships

#### 11. **model_has_permissions**
- Pivot table linking users to permissions
- Direct permission assignment

#### 12. **role_has_permissions**
- Pivot table linking roles to permissions
- Defines what permissions each role has

### Audit & Support Tables

#### 13. **activity_logs**
- Comprehensive audit trail
- Tracks all user actions and changes
- Stores JSON properties for detailed information

#### 14. **sessions**
- Laravel session management
- Tracks active user sessions

#### 15. **cache**
- Application cache storage
- Performance optimization

#### 16. **password_reset_tokens**
- Password reset functionality
- Security token management

---

## Key Indexes

### Production Reports
- `report_number` (unique)
- `production_date, shift_id, line_id` (composite)
- `status`

### Production Report Details
- `production_report_id`
- `motif_id`
- `dimension_id`

### Activity Logs
- `user_id`
- `model_type, model_id` (composite)
- `created_at`

---

## Data Constraints

### Foreign Key Constraints

| Table | Column | References | On Delete |
|-------|--------|------------|-----------|
| production_reports | shift_id | shifts.id | RESTRICT |
| production_reports | line_id | lines.id | RESTRICT |
| production_reports | created_by | users.id | RESTRICT |
| production_reports | updated_by | users.id | SET NULL |
| production_reports | approved_by | users.id | SET NULL |
| production_report_details | production_report_id | production_reports.id | CASCADE |
| production_report_details | motif_id | motifs.id | RESTRICT |
| production_report_details | dimension_id | dimensions.id | RESTRICT |
| activity_logs | user_id | users.id | CASCADE |

### Enum Values

| Column | Values |
|--------|--------|
| production_reports.status | draft, pending, approved, rejected |

---

## Database Statistics

- **Total Tables**: 16
- **Core Business Tables**: 8
- **Master Data Tables**: 4
- **Authorization Tables**: 5
- **Support Tables**: 3
- **Total Relationships**: 20+

---

Generated on: December 30, 2025
Version: 1.0.0
