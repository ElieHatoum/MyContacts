const userModel = require("../../models/user.model");
const contactModel = require("../../models/contacts.model");
const {
    fetchAll,
    saveContact,
    removeContact,
    modifyContact,
} = require("../../services/contacts.service");

jest.mock("../../models/user.model");
jest.mock("../../models/contacts.model");

describe("contacts.service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchAll", () => {
        it("returns contacts when user exists", async () => {
            const userId = "user123";
            const user = { _id: userId, email: "test@example.com" };
            const contacts = [
                {
                    _id: "1",
                    firstName: "John",
                    lastName: "Doe",
                    phoneNumber: "1234567890",
                },
                {
                    _id: "2",
                    firstName: "Jane",
                    lastName: "Smith",
                    phoneNumber: "0987654321",
                },
            ];

            userModel.findById.mockResolvedValue(user);
            contactModel.find.mockResolvedValue(contacts);

            const result = await fetchAll(userId);

            expect(userModel.findById).toHaveBeenCalledWith(userId);
            expect(contactModel.find).toHaveBeenCalledWith({ userId: userId });
            expect(result).toEqual(contacts);
        });

        it("throws 404 error when user not found", async () => {
            const userId = "nonexistent";

            userModel.findById.mockResolvedValue(null);

            await expect(fetchAll(userId)).rejects.toThrow("User not found");

            try {
                await fetchAll(userId);
            } catch (error) {
                expect(error.statusCode).toBe(404);
                expect(error.message).toBe("User not found");
            }

            expect(contactModel.find).not.toHaveBeenCalled();
        });
    });

    describe("saveContact", () => {
        it("creates and saves contact when user exists", async () => {
            const userId = "user123";
            const firstName = "John";
            const lastName = "Doe";
            const phoneNumber = "1234567890";
            const user = { _id: userId, email: "test@example.com" };
            const savedContact = {
                _id: "contact123",
                userId,
                firstName,
                lastName,
                phoneNumber,
            };

            userModel.findById.mockResolvedValue(user);

            // Mock the contactModel constructor and save method
            const mockSave = jest.fn().mockResolvedValue(savedContact);
            contactModel.mockImplementation(function (data) {
                this.userId = data.userId;
                this.firstName = data.firstName;
                this.lastName = data.lastName;
                this.phoneNumber = data.phoneNumber;
                this.save = mockSave;
                return this;
            });

            const result = await saveContact(
                userId,
                firstName,
                lastName,
                phoneNumber
            );

            expect(userModel.findById).toHaveBeenCalledWith(userId);
            expect(contactModel).toHaveBeenCalledWith({
                userId,
                firstName,
                lastName,
                phoneNumber,
            });
            expect(mockSave).toHaveBeenCalled();
            expect(result).toEqual(savedContact);
        });

        it("throws 404 error when user not found", async () => {
            const userId = "nonexistent";

            userModel.findById.mockResolvedValue(null);

            await expect(
                saveContact(userId, "John", "Doe", "1234567890")
            ).rejects.toThrow("User not found");

            try {
                await saveContact(userId, "John", "Doe", "1234567890");
            } catch (error) {
                expect(error.statusCode).toBe(404);
                expect(error.message).toBe("User not found");
            }

            expect(contactModel).not.toHaveBeenCalled();
        });
    });

    describe("removeContact", () => {
        it("deletes and returns contact when user and contact exist", async () => {
            const userId = "user123";
            const contactId = "contact123";
            const user = { _id: userId, email: "test@example.com" };
            const deletedContact = {
                _id: contactId,
                userId,
                firstName: "John",
                lastName: "Doe",
            };

            userModel.findById.mockResolvedValue(user);
            contactModel.findOneAndDelete.mockResolvedValue(deletedContact);

            const result = await removeContact(userId, contactId);

            expect(userModel.findById).toHaveBeenCalledWith(userId);
            expect(contactModel.findOneAndDelete).toHaveBeenCalledWith({
                _id: contactId,
                userId: userId,
            });
            expect(result).toEqual(deletedContact);
        });

        it("throws 404 error when user not found", async () => {
            const userId = "nonexistent";
            const contactId = "contact123";

            userModel.findById.mockResolvedValue(null);

            await expect(removeContact(userId, contactId)).rejects.toThrow(
                "User not found"
            );

            try {
                await removeContact(userId, contactId);
            } catch (error) {
                expect(error.statusCode).toBe(404);
                expect(error.message).toBe("User not found");
            }

            expect(contactModel.findOneAndDelete).not.toHaveBeenCalled();
        });

        it("throws 404 error when contact not found", async () => {
            const userId = "user123";
            const contactId = "nonexistent";
            const user = { _id: userId, email: "test@example.com" };

            userModel.findById.mockResolvedValue(user);
            contactModel.findOneAndDelete.mockResolvedValue(null);

            await expect(removeContact(userId, contactId)).rejects.toThrow(
                "Contact not found"
            );

            try {
                await removeContact(userId, contactId);
            } catch (error) {
                expect(error.statusCode).toBe(404);
                expect(error.message).toBe("Contact not found");
            }

            expect(contactModel.findOneAndDelete).toHaveBeenCalledWith({
                _id: contactId,
                userId: userId,
            });
        });
    });

    describe("modifyContact", () => {
        it("updates and returns contact when user and contact exist", async () => {
            const userId = "user123";
            const contactId = "contact123";
            const update = { firstName: "Johnny", phoneNumber: "9876543210" };
            const user = { _id: userId, email: "test@example.com" };
            const updatedContact = {
                _id: contactId,
                userId,
                firstName: "Johnny",
                lastName: "Doe",
                phoneNumber: "9876543210",
            };

            userModel.findById.mockResolvedValue(user);
            contactModel.findOneAndUpdate.mockResolvedValue(updatedContact);

            const result = await modifyContact(userId, contactId, update);

            expect(userModel.findById).toHaveBeenCalledWith(userId);
            expect(contactModel.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: contactId, userId: userId },
                update,
                { runValidators: true }
            );
            expect(result).toEqual(updatedContact);
        });

        it("throws 404 error when user not found", async () => {
            const userId = "nonexistent";
            const contactId = "contact123";
            const update = { firstName: "Johnny" };

            userModel.findById.mockResolvedValue(null);

            await expect(
                modifyContact(userId, contactId, update)
            ).rejects.toThrow("User not found");

            try {
                await modifyContact(userId, contactId, update);
            } catch (error) {
                expect(error.statusCode).toBe(404);
                expect(error.message).toBe("User not found");
            }

            expect(contactModel.findOneAndUpdate).not.toHaveBeenCalled();
        });

        it("throws 404 error when contact not found", async () => {
            const userId = "user123";
            const contactId = "nonexistent";
            const update = { firstName: "Johnny" };
            const user = { _id: userId, email: "test@example.com" };

            userModel.findById.mockResolvedValue(user);
            contactModel.findOneAndUpdate.mockResolvedValue(null);

            await expect(
                modifyContact(userId, contactId, update)
            ).rejects.toThrow("Contact not found");

            try {
                await modifyContact(userId, contactId, update);
            } catch (error) {
                expect(error.statusCode).toBe(404);
                expect(error.message).toBe("Contact not found");
            }

            expect(contactModel.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: contactId, userId: userId },
                update,
                { runValidators: true }
            );
        });
    });
});
