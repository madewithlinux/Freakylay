/// <reference path="./Converters/web.ts" />
/// <reference path="./Converters/BSDP_2_0.ts" />
/// <reference path="./Converters/BSDP_2_1.ts" />

namespace Freakylay.Connector {
    import WebData = Freakylay.Connector.Converters.Web;
    import Converter_BSDP_2_0 = Freakylay.Connector.Converters.BSDP_2_0.Converter;
    import Converter_BSDP_2_1 = Freakylay.Connector.Converters.BSDP_2_1.Converter;

    export import CBlockHitScore = WebData.BlockHitScore;
    export import CPracticeModeModifiers = WebData.PracticeModeModifiers;
    export import CModifiers = WebData.Modifiers;
    export import CMapData = WebData.MapData;
    export import CLiveData = WebData.LiveData;

    export class DataConverter {
        public readonly dataConverterName: string;
        private readonly dataConverterImpl: WebData.Converter;

        constructor() {
            const params = new URLSearchParams(location.search);
            this.dataConverterName = params.get('dataConverterName') || 'default';
            switch (this.dataConverterName) {
                case 'default':
                case 'BSDP_2_1':
                    this.dataConverterImpl = new Converter_BSDP_2_1();
                    break;
                case 'BSDP_2_0':
                    this.dataConverterImpl = new Converter_BSDP_2_0();
                    break;
                default:
                    console.error('unrecognized data converter name', this.dataConverterName, 'defaulting to BSDP_2_1')
                    this.dataConverterImpl = new Converter_BSDP_2_1();
                    break;
            }
        }

        public convertMapData(data: object): CMapData {
            return this.dataConverterImpl.ConvertMapData(data);
        }

        public convertLiveData(data: object): CLiveData {
            return this.dataConverterImpl.ConvertLiveData(data);
        }
    }
}
