import {expect} from 'chai';
import {EncryptionService} from '../../services/encryptionService';
import {Base64Algorithm, EncryptionAlgorithm} from "../../services/encryptionAlgorithm";

describe('EncryptionService', () => {
    let encryptionService: EncryptionService;

    before(() => {
        encryptionService = new EncryptionService(new Base64Algorithm());
    });

    describe('encryptObject', () => {
        it('should encrypt every value in the object', () => {
            const obj = {
                foo: 'bar',
                baz: 123,
                nested: {nestedProp: 'nestedValue'}
            };

            const encryptedObj = encryptionService.encryptObject(obj);

            Object.keys(obj).forEach(key => {
                expect(encryptedObj).to.have.property(key);
                expect(encryptedObj[key]).to.be.a('string');
            });
        });

        it('should return an empty object if the input object is empty', () => {
            const obj = {};
            const encryptedObj = encryptionService.encryptObject(obj);

            expect(Object.keys(encryptedObj)).to.have.lengthOf(0);
        });
    });

    describe('decryptObject', () => {
        it('should decrypt every value in the object', () => {
            const obj = {
                foo: 'YmFy', // 'bar' encrypted
                baz: 'MTIz', // '123' encrypted
                nested: 'eyJuZXN0ZWRQcm9wIjoibmVzdGVkVmFsdWUifQ==' // '{"nestedProp":"nestedValue"}' encrypted
            };

            const decryptedObj = encryptionService.decryptObject(obj);

            expect(decryptedObj.foo).to.equal('bar');
            expect(decryptedObj.baz).to.equal(123);
            expect(decryptedObj.nested).to.deep.equal({nestedProp: 'nestedValue'});
        });

        it('should return an empty object if the input object is empty', () => {
            const obj = {};
            const decryptedObj = encryptionService.decryptObject(obj);

            expect(Object.keys(decryptedObj)).to.have.lengthOf(0);
        });
    });

    describe('setAlgorithm', () => {
        class MockAlgorithm implements EncryptionAlgorithm {
            encrypt(data: string): string {
                return `mock-encrypt(${data})`;
            }

            decrypt(data: string): string {
                return data.replace('mock-encrypt(', '').replace(')', '');
            }
        }

        it('should set a new encryption algorithm', () => {
            const mockAlgorithm = new MockAlgorithm();

            encryptionService.setAlgorithm(mockAlgorithm);

            const obj = {foo: 'bar'};
            const encryptedObj = encryptionService.encryptObject(obj);
            const decryptedObj = encryptionService.decryptObject(encryptedObj)

            expect(encryptedObj.foo).to.equal('mock-encrypt("bar")');
            expect(decryptedObj).to.be.deep.equal({foo: 'bar'});
        });
    })
});
