import { Request, Response } from 'express';

export class HealthController {
  healthCheck(req: Request, res: Response) {
    try {
      res.status(200).json({
        status: 'ok',
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Server health check failed',
        timestamp: new Date().toISOString(),
      });
    }
  }

  databaseHealthCheck(req: Request, res: Response) {
    const isDatabaseConnected = this.checkDatabaseConnection();

    if (isDatabaseConnected) {
      res.status(200).json({
        status: 'ok',
        message: 'Database connection is healthy',
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(503).json({ // 503 Service Unavailable
        status: 'error',
        message: 'Database connection is unavailable',
        timestamp: new Date().toISOString(),
      });
    }
  }

  externalServiceHealthCheck(req: Request, res: Response) {
    const isExternalServiceAvailable = this.checkExternalService();

    if (isExternalServiceAvailable) {
      res.status(200).json({
        status: 'ok',
        message: 'External service is available',
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(503).json({
        status: 'error',
        message: 'External service is unavailable',
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Example: Memory usage check
  memoryUsage(req: Request, res: Response) {
      const memoryUsage = process.memoryUsage();
      res.status(200).json({
          status: 'ok',
          memoryUsage,
          timestamp: new Date().toISOString(),
      });
  }

  // Example: CPU usage check.
  cpuUsage(req: Request, res: Response){
    const os = require('os');
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;
    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });

    res.status(200).json({
      status: 'ok',
      cpuUsage: {
        idle: totalIdle / cpus.length,
        total: totalTick / cpus.length,
      },
      timestamp: new Date().toISOString(),
    })
  }

  private checkDatabaseConnection(): boolean {
    
    return true; 
  }

  private checkExternalService(): boolean {
    
    return true; 
  }
}