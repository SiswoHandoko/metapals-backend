import { Test, TestingModule } from '@nestjs/testing';
import { FieldCategoriesController } from './field-categories.controller';
import { FieldCategoriesServices } from './field-categories.service';

describe('FieldCategoriesController', () => {
  let fieldCategoriesController: FieldCategoriesController;
  let fieldCategoriesServices: FieldCategoriesServices;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FieldCategoriesController],
      providers: [
        {
          provide: FieldCategoriesServices,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'name #1',
              },
              {
                name: 'name #2',
              },
            ])  
          },
        },
      ],
    }).compile();

    fieldCategoriesController = app.get<FieldCategoriesController>(FieldCategoriesController);
    fieldCategoriesServices = app.get<FieldCategoriesServices>(FieldCategoriesServices);
  });

  it('should be defined', () => {
    expect(fieldCategoriesController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all field categories ', () => {
      fieldCategoriesController.findAll();
      expect(fieldCategoriesServices.findAll).toHaveBeenCalled();
    });
  });
});
