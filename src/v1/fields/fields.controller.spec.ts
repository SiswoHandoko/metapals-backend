import { Test, TestingModule } from '@nestjs/testing';
import { FieldsController } from './fields.controller';
import { FieldsServices } from './fields.service';

describe('FieldsController', () => {
  let fieldsController: FieldsController;
  let fieldsServices: FieldsServices;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FieldsController],
      providers: [
        {
          provide: FieldsServices,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                idFieldCategory: 1,
                name: 'name #1',
              },
              {
                idFieldCategory: 2,
                name: 'name #2',
              },
            ])  
          },
        },
      ],
    }).compile();

    fieldsController = app.get<FieldsController>(FieldsController);
    fieldsServices = app.get<FieldsServices>(FieldsServices);
  });

  it('should be defined', () => {
    expect(fieldsController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all fields ', () => {
      fieldsController.findAll({fieldCategoryId:'1'});
      fieldsController.findAll({fieldCategoryId:null});

      expect(fieldsServices.findAll).toHaveBeenCalled();
    });
  });
});
