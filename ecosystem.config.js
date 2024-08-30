module.exports = {
    apps: [
        {
            name: 'nextjs-app',
            script: 'node_modules/.bin/next',
            args: 'start',
            cwd: './',
            instances: 'max', // or a number to specify the number of instances
            exec_mode: 'cluster', // or 'fork'
            watch: true, // Set to true if you want to enable watching for development
            env: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
        },
    ],
};
