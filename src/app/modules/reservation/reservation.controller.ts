import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ReservationService } from './reservation.service';
import sendResponse from '../../utils/sendResponse';

const createReservation: RequestHandler = catchAsync(async (req, res) => {
  const { ...reservationData } = req.body;

  const result = await ReservationService.createReservation(reservationData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation created successfully',
    data: result,
  });
});

const getAllReservations = catchAsync(async (req, res) => {
  const result = await ReservationService.getAllReservations(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservations retrieved successfully',
    data: result,
  });
});

const reservationUpdate = catchAsync(async (req, res) => {
  const id = req.params.id as string;

  const result = await ReservationService.reservationStatusUpdateIntoDB(
    id,
    req.body.status,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation updated successfully',
    data: result,
  });
});

export const ReservationController = {
  createReservation,
  getAllReservations,
  reservationUpdate,
};
