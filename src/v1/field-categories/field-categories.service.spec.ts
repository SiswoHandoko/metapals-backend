import { Test, TestingModule } from '@nestjs/testing';
import { FieldCategories } from './models/field_categories.model';
import { FieldCategoriesServices } from './field-categories.service';
import { getModelToken } from '@nestjs/sequelize';

const categoriesArray = [
  {
    name: 'Any Category'
  },
  {
    name: 'Any Category'
  },
];

describe('FieldCategoriesServices', () => {
  let service: FieldCategoriesServices;
  let model: typeof FieldCategories;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FieldCategoriesServices,
        {
          provide: getModelToken(FieldCategories),
          useValue: {
            findAll: jest.fn(() => categoriesArray),
          },
        },
      ],
    }).compile();

    service = module.get<FieldCategoriesServices>(FieldCategoriesServices);
    model = module.get<typeof FieldCategories>(getModelToken(FieldCategories));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of field categories', async () => {
      const categories = await service.findAll();
      expect(categories).toEqual(categoriesArray);
    });
  });
});
