// src/temperature/temperature.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';

interface TemperatureResponse {
  location: string;
  sensorId: string;
  temperature: number;
}

@Controller('temperature')
export class TemperatureController {
  // Маршрут с sensorId
  @Get(':sensorId')
  getWithSensorId(
    @Param('sensorId') sensorId: string,
    @Query('location') location?: string,
  ): TemperatureResponse {
    return this.getTemperature(sensorId, location);
  }

  // Маршрут без sensorId
  @Get()
  getWithoutSensorId(
    @Query('location') location?: string,
  ): TemperatureResponse {
    return this.getTemperature(undefined, location);
  }

  // Общая логика
  private getTemperature(
    sensorId?: string,
    location?: string,
  ): TemperatureResponse {
    let resolvedLocation = location || '';
    let resolvedSensorId = sensorId || '';

    if (!resolvedLocation && resolvedSensorId) {
      switch (resolvedSensorId) {
        case '1':
          resolvedLocation = 'Living Room';
          break;
        case '2':
          resolvedLocation = 'Bedroom';
          break;
        case '3':
          resolvedLocation = 'Kitchen';
          break;
        default:
          resolvedLocation = 'Unknown';
      }
    }

    if (!resolvedSensorId) {
      switch (resolvedLocation) {
        case 'Living Room':
          resolvedSensorId = '1';
          break;
        case 'Bedroom':
          resolvedSensorId = '2';
          break;
        case 'Kitchen':
          resolvedSensorId = '3';
          break;
        default:
          resolvedSensorId = '0';
      }
    }

    const temperature = parseFloat((Math.random() * (30 - 15) + 15).toFixed(1));

    return {
      location: resolvedLocation,
      sensorId: resolvedSensorId,
      temperature,
    };
  }
}
