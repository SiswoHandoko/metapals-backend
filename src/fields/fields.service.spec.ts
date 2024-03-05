import { Test, TestingModule } from '@nestjs/testing';
import { Fields } from './models/fields.model';
import { FieldsServices } from './fields.service';
import { getModelToken } from '@nestjs/sequelize';

const fieldsArray = [
  {
    fieldCategoryId: 1,
    name: 'Any Category'
  },
  {
    fieldCategoryId: 2,
    name: 'Any Category'
  },
];

describe('FieldsServices', () => {
  let service: FieldsServices;
  let model: typeof Fields;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FieldsServices,
        {
          provide: getModelToken(Fields),
          useValue: {
            findAll: jest.fn(() => fieldsArray),
          },
        },
      ],
    }).compile();

    service = module.get<FieldsServices>(FieldsServices);
    model = module.get<typeof Fields>(getModelToken(Fields));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of fields', async () => {
      const fields = await service.findAll({fieldCategoryId:'1'});
      expect(fields).toEqual(fieldsArray);
    });
  });
});
