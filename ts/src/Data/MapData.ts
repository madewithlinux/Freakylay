/// <reference path="../Internal/DataKey.ts" />
/// <reference path="../Internal/Helper.ts" />
/// <reference path="../Connector/DataConverter.ts" />

namespace Freakylay.Data {

    import DataKey = Freakylay.Internal.DataKey;
    import Helper = Freakylay.Internal.Helper;

    import DataConverter = Freakylay.Connector.DataConverter;
    import CMapData = Freakylay.Connector.CMapData;

    function mapDataKey<Key extends keyof CMapData>(key: Key, defaultValue: CMapData[Key]) {
        return new DataKey(key, defaultValue);
    }

    export class MapData {

        private dataConverter: DataConverter = new DataConverter();

        public GameVersion: DataKey<string>;
        public PluginVersion: DataKey<string>;
        public InLevel: DataKey<boolean>;
        public LevelPaused: DataKey<boolean>;
        public LevelFinished: DataKey<boolean>;
        public LevelFailed: DataKey<boolean>;
        public LevelQuit: DataKey<boolean>;
        public Hash: DataKey<string>;
        public SongName: DataKey<string>;
        public SongSubName: DataKey<string>;
        public SongAuthor: DataKey<string>;
        public Mapper: DataKey<string>;
        public BSRKey: DataKey<string>;
        public CoverImage: DataKey<string>;
        public Length: DataKey<number>;
        public TimeScale: DataKey<number>;
        public MapType: DataKey<string>;
        public Difficulty: DataKey<string>;
        public CustomDifficultyLabel: DataKey<string>;
        public BPM: DataKey<number>;
        public NJS: DataKey<number>;
        public ModifiersMultiplier: DataKey<number>;
        public PracticeMode: DataKey<boolean>;
        public PP: DataKey<number>;
        public Star: DataKey<number>;
        public IsMultiplayer: DataKey<boolean>;
        public PreviousRecord: DataKey<number>;
        public PreviousBSR: DataKey<string>;

        public Modifiers: Modifiers;
        public PracticeModeModifiers: PracticeModeModifiers;

        constructor() {
            this.GameVersion = mapDataKey('GameVersion', '1.13.2');
            this.PluginVersion = mapDataKey('PluginVersion', '2.0.0.0');
            this.InLevel = mapDataKey('InLevel', false);
            this.LevelPaused = mapDataKey('LevelPaused', false);
            this.LevelFinished = mapDataKey('LevelFinished', false);
            this.LevelFailed = mapDataKey('LevelFailed', false);
            this.LevelQuit = mapDataKey('LevelQuit', false);
            this.Hash = mapDataKey('Hash', '');
            this.SongName = mapDataKey('SongName', '');
            this.SongSubName = mapDataKey('SongSubName', '');
            this.SongAuthor = mapDataKey('SongAuthor', '');
            this.Mapper = mapDataKey('Mapper', '');
            this.BSRKey = mapDataKey('BSRKey', 'BSRKey');
            this.CoverImage = mapDataKey('CoverImage', 'img/BS_Logo.jpg');
            this.Length = mapDataKey('Duration', 60);
            this.TimeScale = new DataKey('TimeScale', 0);
            this.MapType = mapDataKey('MapType', 'Standard');
            this.Difficulty = mapDataKey('Difficulty', 'ExpertPlus');
            this.CustomDifficultyLabel = mapDataKey('CustomDifficultyLabel', '');
            this.BPM = mapDataKey('BPM', 0);
            this.NJS = mapDataKey('NJS', 0);
            this.ModifiersMultiplier = mapDataKey('ModifiersMultiplier', 1);
            this.PracticeMode = mapDataKey('PracticeMode', false);
            this.PP = mapDataKey('PP', 0);
            this.Star = mapDataKey('Star', 0);
            this.IsMultiplayer = mapDataKey('IsMultiplayer', false);
            this.PreviousRecord = mapDataKey('PreviousRecord', 0);
            this.PreviousBSR = mapDataKey('PreviousBSR', '');

            this.Modifiers = new Modifiers();
            this.PracticeModeModifiers = new PracticeModeModifiers();
        }

        public update(data: {}): void {
            if (data && Object.keys(data).length > 0) {
                data = this.dataConverter.convertMapData(data);
            }
            this.GameVersion.update(data);
            this.PluginVersion.update(data);
            this.InLevel.update(data);
            this.LevelPaused.update(data);
            this.LevelFinished.update(data);
            this.LevelFailed.update(data);
            this.LevelQuit.update(data);
            this.Hash.update(data);
            this.SongName.update(data);
            this.SongSubName.update(data);
            this.SongAuthor.update(data);
            this.Mapper.update(data);
            this.BSRKey.update(data);
            this.CoverImage.update(data);
            this.Length.update(data);
            this.TimeScale.update(data);
            this.MapType.update(data);
            this.Difficulty.update(data);
            this.CustomDifficultyLabel.update(data);
            this.BPM.update(data);
            this.NJS.update(data);
            this.ModifiersMultiplier.update(data);
            this.PracticeMode.update(data);
            this.PP.update(data);
            this.Star.update(data);
            this.IsMultiplayer.update(data);
            this.PreviousRecord.update(data);
            this.PreviousBSR.update(data);

            this.Modifiers.update(Helper.isset(data, 'Modifiers', {}));
            this.PracticeModeModifiers.update(Helper.isset(data, 'PracticeModeModifiers', {}));
        }

        public getDifficultyString(): string {
            let diff = this.Difficulty.getValue();
            return diff == 'ExpertPlus' ? 'Expert+' : diff;
        }

        public getFullDifficultyLabel(hideDefaultDifficulty: boolean): string {
            let normalDifficultyString = this.getDifficultyString();
            let custom = this.CustomDifficultyLabel.getValue();

            if (hideDefaultDifficulty) {
                return custom.length > 0 ? custom : normalDifficultyString;
            }

            if (custom === '' || custom === normalDifficultyString) {
                return normalDifficultyString;
            } else {
                return custom + ' - ' + normalDifficultyString;
            }
        }

        public getSongAuthorLine(): string {
            let name = this.SongAuthor.getValue();

            if (this.SongSubName.getValue().length > 0) {
                //name += ' <small>' + this.SongSubName.getValue() + '</small>';
                name += ' - ' + this.SongSubName.getValue();
            }

            return name;
        }
    }
}