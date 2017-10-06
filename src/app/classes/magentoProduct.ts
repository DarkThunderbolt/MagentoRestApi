import {RestApiService} from '../rest-api/rest-api.service';

export class MagentoProduct {
  public sku: string;
  public price: number;
  public name: string;
  public created_at: any;
  public updated_at: any;
  public weight: number;
  public images: string;

  public attrinutes: Array<[string, string]> = [];

  constructor(data: any) {
    this.sku = data.sku;
    this.price = data.price;
    this.name = data.name;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.images = RestApiService.mediaUrl + data.media_gallery_entries[0].file;
    this.weight = data.weight;

    for (let i = 0; i < data.custom_attributes.length; i++) {
      if ( StandartAttr.hasOwnProperty(data.custom_attributes[i].attribute_code)) {
        continue;
      } else {
        this.attrinutes.push([data.custom_attributes[i].attribute_code, data.custom_attributes[i].value]);
      }
    }
  }
}

enum StandartAttr {
  'special_from_date',
  'meta_title',
  'meta_keyword',
  'meta_description',
  'image',
  'small_image',
  'thumbnail',
  'news_from_date',
  'custom_design_from',
  'category_ids',
  'options_container',
  'required_options',
  'has_options',
  'url_key',
  'swatch_image',
  'tax_class_id'
}
