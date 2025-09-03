import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { menuServices } from './menu.service';

const createMenu = catchAsync(async (req, res) => {
  const result = await menuServices.createMenuIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Menu created successfully',
    data: result,
  });
});

const getAllMenu = catchAsync(async (req, res) => {
  const result = await menuServices.getAllMenuFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Menu fetched successfully',
    data: result,
  });
});

export const menuControllers = {
  createMenu,
  getAllMenu,
};
