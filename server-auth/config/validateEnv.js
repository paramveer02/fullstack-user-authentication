import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  'DB_URI',
  'JWT_SECRET_KEY', 
  'JWT_EXPIRES_IN',
  'NODE_ENV'
];

const validateEnvironment = () => {
  const missingVars = requiredEnvVars.filter(key => !process.env[key]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(key => console.error(`  - ${key}`));
    console.error('\nPlease create a .env file with the required variables.');
    process.exit(1);
  }
  
  // Validate JWT secret strength
  if (process.env.JWT_SECRET_KEY.length < 32) {
    console.error('❌ JWT_SECRET_KEY should be at least 32 characters long for security.');
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated successfully');
};

export default validateEnvironment;