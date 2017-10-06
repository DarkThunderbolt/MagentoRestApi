import {RestApiService} from '../rest-api/rest-api.service';

export class MagentoProduct {
  public price: number;
  public name: string;
  public created_at: any;
  public updated_at: any;
  public weight: number;
  public images: string;
  public brand: string;
  public composition_1: string;

  constructor(data: any) {
    this.price = data.price;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.images = RestApiService.mediaUrl + data.media_gallery_entries[0].file;
    this.weight = data.weight;
    for (let i = 0; i < data.custom_attributes.length; i++) {
      if (data.custom_attributes[i].attribute_code === 'brand') {
        this.brand = data.custom_attributes[i].value;
        break;
      }
    }
    for (let i = 0; i < data.custom_attributes.length; i++) {
      if (data.custom_attributes[i].attribute_code === 'composition_1') {
        this.composition_1 = data.custom_attributes[i].value;
        break;
      }
    }
    this.name = data.name;
  }
}
