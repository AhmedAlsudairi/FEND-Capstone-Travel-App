import { createTrip, removeTrip , updateUI , getFromLocalStorage , greeting , getCountdown , subtractDates } from '../client/js/app';



describe('Testing the createTrip function', () => {

  test('Testing createTrip() , is it defined?', async () => {
    expect(createTrip).toBeDefined()
  })

  test('Testing the createTrip(), is it function?', async () => {
    expect(typeof createTrip).toBe('function');
  });

});

describe('Testing the removeTrip function', () => {

    test('Testing removeTrip() , is it defined?', async () => {
      expect(removeTrip).toBeDefined()
    })
  
    test('Testing the removeTrip(), is it function?', async () => {
      expect(typeof removeTrip).toBe('function');
    });
  
  });

  describe('Testing the updateUI function', () => {

    test('Testing updateUI() , is it defined?', async () => {
      expect(updateUI).toBeDefined()
    })
  
    test('Testing the updateUI(), is it function?', async () => {
      expect(typeof updateUI).toBe('function');
    });
  
  });

  
  describe('Testing the getFromLocalStorage function', () => {

    test('Testing getFromLocalStorage() , is it defined?', async () => {
      expect(getFromLocalStorage).toBeDefined()
    })
  
    test('Testing the getFromLocalStorage(), is it function?', async () => {
      expect(typeof getFromLocalStorage).toBe('function');
    });
  
  });

  
  describe('Testing the greeting function', () => {

    test('Testing greeting() , is it defined?', async () => {
      expect(greeting).toBeDefined()
    })
  
    test('Testing the greeting(), is it function?', async () => {
      expect(typeof greeting).toBe('function');
    });
  
  });

  
  describe('Testing the getCountdown function', () => {

    test('Testing getCountdown() , is it defined?', async () => {
      expect(getCountdown).toBeDefined()
    })
  
    test('Testing the getCountdown(), is it function?', async () => {
      expect(typeof getCountdown).toBe('function');
    });
  
    test('Testing the getCountdown(), is it return number?', async () => {
        expect(typeof getCountdown('2020-12-20')).toBe('number');
      });
  });

  
  describe('Testing the subtractDates function', () => {

    test('Testing subtractDates() , is it defined?', async () => {
      expect(subtractDates).toBeDefined()
    })
  
    test('Testing the subtractDates(), is it function?', async () => {
      expect(typeof subtractDates).toBe('function');
    });
  
    test('Testing the subtractDates(), is it return number?', async () => {
        expect(typeof getCountdown('2020-11-15','2020-12-20')).toBe('number');
      });
  });
