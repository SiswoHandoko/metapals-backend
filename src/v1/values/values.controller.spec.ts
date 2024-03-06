import { Test, TestingModule } from '@nestjs/testing';
import { ValuesController } from './values.controller';
import { ValueServices } from './values.service';

describe('ValuesController', () => {
  let valuesController: ValuesController;
  let valueServices: ValueServices;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ValuesController],
      providers: [
        {
          provide: ValueServices,
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

    valuesController = app.get<ValuesController>(ValuesController);
    valueServices = app.get<ValueServices>(ValueServices);
  });

  it('should be defined', () => {
    expect(valuesController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all fields ', () => {
      valuesController.findAll({fieldId:'1'});
      valuesController.findAll({fieldId:null});
      expect(valueServices.findAll).toHaveBeenCalled();
    });
  });
});
