# Speech Path Dash

A comprehensive CRM system for speech pathology practices, built with Next.js and Supabase.

## Features

### Session Tracking
- **Quick Session Logging**: Fast data entry workflow for logging therapy sessions
- **Patient Search**: Searchable dropdown to quickly find patients
- **Auto-duration Calculation**: Automatically calculates session duration from start/end times
- **Form Validation**: Ensures end time is after start time and reasonable durations
- **Multiple Service Types**: Support for assessment, therapy, consultation, and review sessions
- **Location Tracking**: Clinic, home visit, and telehealth options
- **Billing Code Support**: Optional billing codes for each session

### Daily Dashboard
- **Today's Sessions**: View all sessions logged for the current day
- **Real-time Stats**: Total hours worked, patients seen, and session count
- **Quick Actions**: Easy access to log new sessions
- **Responsive Design**: Works on desktop and mobile devices

### Patient Management
- **Patient Database**: Complete patient records with contact information
- **NDIS Support**: Special fields for NDIS participant numbers
- **Patient Types**: Support for both private and NDIS patients
- **Search & Filter**: Find patients by name, email, or phone
- **Status Tracking**: Active/inactive patient status

### Technical Features
- **Supabase Backend**: Real-time database with Row Level Security
- **TypeScript**: Full type safety throughout the application
- **Form Validation**: Zod schema validation for all forms
- **Responsive UI**: Clean, modern interface built with Tailwind CSS
- **Real-time Updates**: Automatic refresh when data changes

## Database Schema

### Patients Table
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `dob` (Date, Required)
- `phone` (Text, Optional)
- `email` (Text, Optional)
- `patient_type` (Enum: 'ndis' | 'private')
- `ndis_participant_number` (Text, Optional)
- `status` (Enum: 'active' | 'inactive')
- `created_at` (Timestamp)

### Sessions Table
- `id` (UUID, Primary Key)
- `patient_id` (UUID, Foreign Key)
- `session_date` (Date, Required)
- `start_time` (Time, Required)
- `end_time` (Time, Required)
- `duration_minutes` (Integer, Auto-calculated)
- `service_type` (Enum: 'assessment' | 'therapy' | 'consultation' | 'review')
- `location` (Enum: 'clinic' | 'home_visit' | 'telehealth')
- `billing_code` (Text, Optional)
- `created_at` (Timestamp)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd speech-path-dash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   The database schema is already configured in Supabase. The application includes:
   - Patients table with RLS policies
   - Sessions table with RLS policies
   - Auto-calculated duration field
   - Proper indexes for performance

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Adding Patients
1. Click "Add Patient" in the navigation
2. Fill in the patient details
3. Select patient type (Private or NDIS)
4. Add NDIS participant number if applicable
5. Save the patient

### Logging Sessions
1. From the dashboard, click "Log Session"
2. Search for and select a patient
3. Choose the session date (defaults to today)
4. Set start and end times
5. Select service type and location
6. Add optional billing code
7. Save the session

### Viewing Data
- **Dashboard**: View today's sessions and statistics
- **Patients**: Browse and search all patients
- **Session Form**: Quick access to log new sessions

## Development

### Project Structure
```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── daily-dashboard.tsx
│   ├── session-form.tsx
│   ├── patient-list.tsx
│   ├── patient-form.tsx
│   └── navigation.tsx
└── lib/               # Utilities and configuration
    ├── supabase.ts    # Supabase client and types
    └── utils.ts       # Utility functions
```

### Key Technologies
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend-as-a-Service
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **date-fns**: Date manipulation
- **Lucide React**: Icon library

### Database Features
- **Row Level Security**: Secure data access
- **Auto-calculated Fields**: Duration automatically computed
- **Foreign Key Relationships**: Proper data integrity
- **Indexes**: Optimized for performance
- **Enums**: Type-safe categorical data

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.
