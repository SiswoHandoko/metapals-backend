import { Test, TestingModule } from '@nestjs/testing';
import { NativeHabitats } from './models/native_habitats.model';
import {  ValueServices } from './values.service';
import { getModelToken } from '@nestjs/sequelize';
import { FamilyNames } from './models/family_names.model';
import { PreferredClimateZones } from './models/preferred_climate_zones.model';

const fieldsArray = [
  {
    name: 'Any'
  },
  {
    name: 'Any'
  },
];

describe('ValueServices', () => {
  let service: ValueServices;
  
  let modelFamilyNames: typeof FamilyNames;
  let modelNativeHabitats: typeof NativeHabitats;
  let modelPreferredClimateZones: typeof PreferredClimateZones;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValueServices,
        {
          provide: getModelToken(FamilyNames),
          useValue: {
            findAll: jest.fn(() => fieldsArray),
          },
        },
        {
          provide: getModelToken(NativeHabitats),
          useValue: {
            findAll: jest.fn(() => fieldsArray),
          },
        },
        {
          provide: getModelToken(PreferredClimateZones),
          useValue: {
            findAll: jest.fn(() => fieldsArray),
          },
        },
      ],
    }).compile();

    service = module.get<ValueServices>(ValueServices);
    modelFamilyNames = module.get<typeof FamilyNames>(getModelToken(FamilyNames));
    modelNativeHabitats = module.get<typeof NativeHabitats>(getModelToken(NativeHabitats));
    modelPreferredClimateZones = module.get<typeof PreferredClimateZones>(getModelToken(PreferredClimateZones));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of fields', async () => {
      const fields = await service.findAll({fieldId:'1'});
      expect(fields).toEqual(fieldsArray);
    });
  });
});
