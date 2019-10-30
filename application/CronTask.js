const cron = require('cron');

module.exports = class CronTask {

    start () {
        this.task.start();
    }

    /**
     * Create cron task
     * @param cronTaskExecutionTime
     * @param callback
     */
    task (cronTaskExecutionTime, callback) {
        this.task = new cron.CronJob(cronTaskExecutionTime, callback);
    }

};