const {
    fetchAll,
    saveContact,
    removeContact,
    modifyContact,
} = require("../../services/contacts.service");
const {
    getContacts,
    createContact,
    deleteContact,
    updateContact,
} = require("../../controller/contacts.controller");

// Mock the contacts service for controller tests
jest.mock("../../services/contacts.service");

describe("contacts.controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getContacts", () => {
        it("returns 200 with contacts on success", async () => {
            const req = { userData: { userId: "user123" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
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

            fetchAll.mockResolvedValue(contacts);

            await getContacts(req, res);

            expect(fetchAll).toHaveBeenCalledWith("user123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: contacts,
            });
        });

        it("returns error with statusCode on failure", async () => {
            const req = { userData: { userId: "user123" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const error = new Error("User not found");
            error.statusCode = 404;

            fetchAll.mockRejectedValue(error);

            await getContacts(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                sucess: false, // Note: typo in original code
                message: "User not found",
            });
        });

        it("returns 500 when error has no statusCode", async () => {
            const req = { userData: { userId: "user123" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const error = new Error("Database connection failed");

            fetchAll.mockRejectedValue(error);

            await getContacts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                sucess: false, // Note: typo in original code
                message: "Database connection failed",
            });
        });
    });

    describe("createContact", () => {
        it("returns 201 with created contact on success", async () => {
            const req = {
                userData: { userId: "user123" },
                body: {
                    firstName: "John",
                    lastName: "Doe",
                    phoneNumber: "1234567890",
                },
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const savedContact = {
                _id: "contact123",
                userId: "user123",
                firstName: "John",
                lastName: "Doe",
                phoneNumber: "1234567890",
            };

            saveContact.mockResolvedValue(savedContact);

            await createContact(req, res);

            expect(saveContact).toHaveBeenCalledWith(
                "user123",
                "John",
                "Doe",
                "1234567890"
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Contact created",
                result: savedContact,
            });
        });

        it("returns error with statusCode on failure", async () => {
            const req = {
                userData: { userId: "user123" },
                body: {
                    firstName: "John",
                    lastName: "Doe",
                    phoneNumber: "1234567890",
                },
            };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const error = new Error("User not found");
            error.statusCode = 404;

            saveContact.mockRejectedValue(error);

            await createContact(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: "User not found",
            });
        });

        it("returns 500 when error has no statusCode", async () => {
            const req = {
                userData: { userId: "user123" },
                body: {
                    firstName: "John",
                    lastName: "Doe",
                    phoneNumber: "1234567890",
                },
            };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const error = new Error("Validation failed");

            saveContact.mockRejectedValue(error);

            await createContact(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: "Validation failed",
            });
        });
    });

    describe("deleteContact", () => {
        it("returns 200 with success message on successful deletion", async () => {
            const req = {
                userData: { userId: "user123" },
                params: { contactId: "contact123" },
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const deletedContact = {
                _id: "contact123",
                userId: "user123",
                firstName: "John",
                lastName: "Doe",
            };

            removeContact.mockResolvedValue(deletedContact);

            await deleteContact(req, res);

            expect(removeContact).toHaveBeenCalledWith("user123", "contact123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Contact deleted",
            });
        });

        it("returns error with statusCode on failure", async () => {
            const req = {
                userData: { userId: "user123" },
                params: { contactId: "contact123" },
            };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const error = new Error("Contact not found");
            error.statusCode = 404;

            removeContact.mockRejectedValue(error);

            await deleteContact(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: "Contact not found",
            });
        });

        it("returns 500 when error has no statusCode", async () => {
            const req = {
                userData: { userId: "user123" },
                params: { contactId: "contact123" },
            };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const error = new Error("Database error");

            removeContact.mockRejectedValue(error);

            await deleteContact(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: "Database error",
            });
        });
    });

    describe("updateContact", () => {
        it("returns 200 with success message on successful update", async () => {
            const req = {
                userData: { userId: "user123" },
                params: { contactId: "contact123" },
                body: { firstName: "Johnny", phoneNumber: "9876543210" },
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const updatedContact = {
                _id: "contact123",
                userId: "user123",
                firstName: "Johnny",
                lastName: "Doe",
                phoneNumber: "9876543210",
            };

            modifyContact.mockResolvedValue(updatedContact);

            await updateContact(req, res);

            expect(modifyContact).toHaveBeenCalledWith(
                "user123",
                "contact123",
                req.body
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Contact updated",
            });
        });

        it("returns error with statusCode on failure", async () => {
            const req = {
                userData: { userId: "user123" },
                params: { contactId: "contact123" },
                body: { firstName: "Johnny" },
            };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const error = new Error("Contact not found");
            error.statusCode = 404;

            modifyContact.mockRejectedValue(error);

            await updateContact(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: "Contact not found",
            });
        });

        it("returns 500 when error has no statusCode", async () => {
            const req = {
                userData: { userId: "user123" },
                params: { contactId: "contact123" },
                body: { firstName: "Johnny" },
            };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const error = new Error("Validation error");

            modifyContact.mockRejectedValue(error);

            await updateContact(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: "Validation error",
            });
        });
    });
});
