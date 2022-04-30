import { ValidationError, Validator } from './validator';

describe('Validator', () => {
  const path: string[] = ['foo', 'bar'];
  const validator: Validator = new Validator();

  describe('SchemaArray', () => {
    // array
    // 1) nullable
    // 2) required
    // 3) check correct type
  });

  describe('SchemaBoolean', () => {
    // SchemaBoolean
    // 1) nullable
    // 2) required
    // 3) check correct type

    it('should return an error if the data is not a string', () => {
      const exampleErrors: ValidationError[] = [{ message: 'The value should be boolean', path: '' }];
      const exampleErrorsWithPath: ValidationError[] = [{ message: 'The value should be boolean', path: 'foo.bar' }];

      // string
      expect(validator.validate({ type: 'boolean' }, 'Hello World')).toEqual(exampleErrors);
      expect(validator.validate({ type: 'boolean' }, 'Hello World', path)).toEqual(exampleErrorsWithPath);

      // number
      expect(validator.validate({ type: 'boolean' }, 1245)).toEqual(exampleErrors);
      expect(validator.validate({ type: 'boolean' }, 1245, path)).toEqual(exampleErrorsWithPath);

      // true
      expect(validator.validate({ type: 'boolean' }, true)).toEqual([]);
      expect(validator.validate({ type: 'boolean' }, true, path)).toEqual([]);

      // false
      expect(validator.validate({ type: 'boolean' }, false)).toEqual([]);
      expect(validator.validate({ type: 'boolean' }, false, path)).toEqual([]);

      // undefined
      expect(validator.validate({ type: 'boolean' }, undefined)).toEqual(exampleErrors);
      expect(validator.validate({ type: 'boolean' }, undefined, path)).toEqual(exampleErrorsWithPath);

      // Symbol
      expect(validator.validate({ type: 'boolean' }, Symbol('Hello World'))).toEqual(exampleErrors);
      expect(validator.validate({ type: 'boolean' }, Symbol('Hello World'), path)).toEqual(exampleErrorsWithPath);

      // null
      expect(validator.validate({ type: 'boolean' }, null)).toEqual(exampleErrors);
      expect(validator.validate({ type: 'boolean' }, null, path)).toEqual(exampleErrorsWithPath);

      // NaN
      expect(validator.validate({ type: 'boolean' }, NaN)).toEqual(exampleErrors);
      expect(validator.validate({ type: 'boolean' }, NaN, path)).toEqual(exampleErrorsWithPath);

      // array
      expect(validator.validate({ type: 'boolean' }, [])).toEqual(exampleErrors);
      expect(validator.validate({ type: 'boolean' }, [], path)).toEqual(exampleErrorsWithPath);

      // object
      expect(validator.validate({ type: 'boolean' }, {})).toEqual(exampleErrors);
      expect(validator.validate({ type: 'boolean' }, {}, path)).toEqual(exampleErrorsWithPath);
    });
  });

  describe('SchemaEnum', () => {
    // SchemaEnum
    // 1) nullable
    // 2) required
    // 3) check correct type
  });

  describe('SchemaNumber', () => {
    it('should validate the max condition correctly', () => {
      // greater than max
      expect(validator.validate({ max: 10, type: 'number' }, 15)).toEqual([
        { message: 'The value should be less than or equal to 10', path: '' },
      ]);
      expect(validator.validate({ max: 10, type: 'number' }, 15, path)).toEqual([
        { message: 'The value should be less than or equal to 10', path: 'foo.bar' },
      ]);

      // equal to max
      expect(validator.validate({ max: 10, type: 'number' }, 10)).toEqual([]);
      expect(validator.validate({ max: 10, type: 'number' }, 10, path)).toEqual([]);

      // less than max
      expect(validator.validate({ max: 10, type: 'number' }, 5)).toEqual([]);
      expect(validator.validate({ max: 10, type: 'number' }, 5, path)).toEqual([]);
    });

    it('should validate the min condition correctly', () => {
      // less than min
      expect(validator.validate({ min: 10, type: 'number' }, 5)).toEqual([
        { message: 'The value should be greater than or equal to 10', path: '' },
      ]);
      expect(validator.validate({ min: 10, type: 'number' }, 5, path)).toEqual([
        { message: 'The value should be greater than or equal to 10', path: 'foo.bar' },
      ]);

      // equal to min
      expect(validator.validate({ min: 10, type: 'number' }, 10)).toEqual([]);
      expect(validator.validate({ min: 10, type: 'number' }, 10, path)).toEqual([]);

      // greater than min
      expect(validator.validate({ min: 10, type: 'number' }, 15)).toEqual([]);
      expect(validator.validate({ min: 10, type: 'number' }, 15, path)).toEqual([]);
    });

    it('should validate the nullable condition correctly', () => {
      // nullable: false (default)
      expect(validator.validate({ type: 'number' }, null)).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ type: 'number' }, null, path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // nullable: false
      expect(validator.validate({ nullable: false, type: 'number' }, null)).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ nullable: false, type: 'number' }, null, path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // nullable: true
      expect(validator.validate({ nullable: true, type: 'number' }, null)).toEqual([]);
      expect(validator.validate({ nullable: true, type: 'number' }, null, path)).toEqual([]);
    });

    it('should validate the required condition correctly', () => {
      // required: false (default)
      expect(validator.validate({ type: 'number' }, undefined)).toEqual([]);
      expect(validator.validate({ type: 'number' }, undefined, path)).toEqual([]);

      // required: false
      expect(validator.validate({ required: false, type: 'number' }, undefined)).toEqual([]);
      expect(validator.validate({ required: false, type: 'number' }, undefined, path)).toEqual([]);

      // required: true
      expect(validator.validate({ required: true, type: 'number' }, undefined)).toEqual([
        { message: 'The value is required', path: '' },
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, type: 'number' }, undefined, path)).toEqual([
        { message: 'The value is required', path: 'foo.bar' },
        { message: 'The value should be number', path: 'foo.bar' },
      ]);
    });

    it('should validate the type condition correctly', () => {
      // string
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, 'Hello World')).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, 'Hello World', path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // number
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, 1245)).toEqual([]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, 1245, path)).toEqual([]);

      // true
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, true)).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, true, path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // false
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, false)).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, false, path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // undefined
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, undefined)).toEqual([
        { message: 'The value is required', path: '' },
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, undefined, path)).toEqual([
        { message: 'The value is required', path: 'foo.bar' },
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // symbol
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, Symbol('Hello World'))).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, Symbol('Hello World'), path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // null
      expect(validator.validate({ nullable: false, required: true, type: 'number' }, null)).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ nullable: false, required: true, type: 'number' }, null, path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // NaN
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, NaN)).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, NaN, path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // array
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, [])).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, [], path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);

      // object
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, {})).toEqual([
        { message: 'The value should be number', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'number' }, {}, path)).toEqual([
        { message: 'The value should be number', path: 'foo.bar' },
      ]);
    });
  });

  describe('SchemaObject', () => {
    // object
    // 1) nullable
    // 2) required
    // 3) check correct type
  });

  describe('SchemaString', () => {
    it('should validate the expressions condition correctly', () => {
      // todo
    });

    it('should validate the maxLength condition correctly', () => {
      // greater than maxLength
      expect(validator.validate({ maxLength: 10, type: 'string' }, 'HelloHelloHello')).toEqual([
        { message: 'The value must be shorter than or equal to 10 characters', path: '' },
      ]);
      expect(validator.validate({ maxLength: 10, type: 'string' }, 'HelloHelloHello', path)).toEqual([
        { message: 'The value must be shorter than or equal to 10 characters', path: 'foo.bar' },
      ]);

      // equal to maxLength
      expect(validator.validate({ maxLength: 10, type: 'string' }, 'HelloHello')).toEqual([]);
      expect(validator.validate({ maxLength: 10, type: 'string' }, 'HelloHello', path)).toEqual([]);

      // shorter than maxLength
      expect(validator.validate({ maxLength: 10, type: 'string' }, 'Hello')).toEqual([]);
      expect(validator.validate({ maxLength: 10, type: 'string' }, 'Hello', path)).toEqual([]);
    });

    it('should validate the minLength condition correctly', () => {
      // less than minLength
      expect(validator.validate({ minLength: 10, type: 'string' }, 'Hello')).toEqual([
        { message: 'The value must be longer than or equal to 10 characters', path: '' },
      ]);
      expect(validator.validate({ minLength: 10, type: 'string' }, 'Hello', path)).toEqual([
        { message: 'The value must be longer than or equal to 10 characters', path: 'foo.bar' },
      ]);

      // equal to minLength
      expect(validator.validate({ minLength: 10, type: 'string' }, 'HelloHello')).toEqual([]);
      expect(validator.validate({ minLength: 10, type: 'string' }, 'HelloHello', path)).toEqual([]);

      // longer than minLength
      expect(validator.validate({ minLength: 10, type: 'string' }, 'HelloHelloHello')).toEqual([]);
      expect(validator.validate({ minLength: 10, type: 'string' }, 'HelloHelloHello', path)).toEqual([]);
    });

    it('should validate the nullable condition correctly', () => {
      // nullable: false (default)
      expect(validator.validate({ type: 'string' }, null)).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ type: 'string' }, null, path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // nullable: false
      expect(validator.validate({ nullable: false, type: 'string' }, null)).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ nullable: false, type: 'string' }, null, path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // nullable: true
      expect(validator.validate({ nullable: true, type: 'string' }, null)).toEqual([]);
      expect(validator.validate({ nullable: true, type: 'string' }, null, path)).toEqual([]);
    });

    it('should validate the required condition correctly', () => {
      // required: false (default)
      expect(validator.validate({ type: 'string' }, undefined)).toEqual([]);
      expect(validator.validate({ type: 'string' }, undefined, path)).toEqual([]);

      // required: false
      expect(validator.validate({ required: false, type: 'string' }, undefined)).toEqual([]);
      expect(validator.validate({ required: false, type: 'string' }, undefined, path)).toEqual([]);

      // required: true
      expect(validator.validate({ required: true, type: 'string' }, undefined)).toEqual([
        { message: 'The value is required', path: '' },
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, type: 'string' }, undefined, path)).toEqual([
        { message: 'The value is required', path: 'foo.bar' },
        { message: 'The value should be string', path: 'foo.bar' },
      ]);
    });

    it('should validate the type condition correctly', () => {
      // string
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, 'Hello World')).toEqual([]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, 'Hello World', path)).toEqual([]);

      // string
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, 1245)).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, 1245, path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // true
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, true)).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, true, path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // false
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, false)).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, false, path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // undefined
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, undefined)).toEqual([
        { message: 'The value is required', path: '' },
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, undefined, path)).toEqual([
        { message: 'The value is required', path: 'foo.bar' },
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // symbol
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, Symbol('Hello World'))).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, Symbol('Hello World'), path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // null
      expect(validator.validate({ nullable: false, required: true, type: 'string' }, null)).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ nullable: false, required: true, type: 'string' }, null, path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // NaN
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, NaN)).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, NaN, path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // array
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, [])).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, [], path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);

      // object
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, {})).toEqual([
        { message: 'The value should be string', path: '' },
      ]);
      expect(validator.validate({ required: true, nullable: false, type: 'string' }, {}, path)).toEqual([
        { message: 'The value should be string', path: 'foo.bar' },
      ]);
    });
  });
});
