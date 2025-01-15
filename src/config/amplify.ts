export const amplifyConfig = {
    Auth: {
        region: 'us-east-2',
        mandatorySignIn: false
    },
    API: {
        endpoints: [
            {
                name: 'rugwatchdog',
                endpoint: process.env.API_ENDPOINT || 'https://rugwatchdog.vercel.app/api',
                region: 'us-east-2'
            }
        ]
    },
    Storage: {
        AWSS3: {
            bucket: 'rugwatchdog-storage',
            region: 'us-east-2'
        }
    }
}; 