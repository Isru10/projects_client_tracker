import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<import("./schemas/client.schema").Client>;
    findAll(): Promise<import("./schemas/client.schema").Client[]>;
    findOne(id: string): Promise<import("./schemas/client.schema").Client>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("./schemas/client.schema").Client>;
    remove(id: string): Promise<void>;
}
