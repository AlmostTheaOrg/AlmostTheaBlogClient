import { DynamicRepository } from "./DynamicRepository";
import { Image } from "./Image";
import { Injectable } from "@angular/core";

@Injectable()
export class ImageRepository extends DynamicRepository<Image>{
    
}