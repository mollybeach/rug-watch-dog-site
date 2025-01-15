export const awsConfig = {
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    },
    amplify: {
        appId: 'your-amplify-app-id',
        branch: 'main'
    }
}; 