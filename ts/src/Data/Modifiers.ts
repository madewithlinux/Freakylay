/// <reference path="../Internal/DataKey.ts" />
/// <reference path="../Connector/DataConverter.ts" />

namespace Freakylay.Data {

    import DataKey = Freakylay.Internal.DataKey;
    import CModifiers = Freakylay.Connector.CModifiers;

    function modifiersDataKey<Key extends keyof CModifiers>(key: Key, defaultValue: CModifiers[Key]) {
        return new DataKey(key, defaultValue);
    }

    export class Modifiers {

        public noFail: DataKey<boolean>;
        public oneLife: DataKey<boolean>;
        public fourLives: DataKey<boolean>;
        public noBombs: DataKey<boolean>;
        public noWalls: DataKey<boolean>;
        public noArrows: DataKey<boolean>;
        public ghostNotes: DataKey<boolean>;
        public disappearingArrows: DataKey<boolean>;
        public smallNotes: DataKey<boolean>;
        public proMode: DataKey<boolean>;
        public strictAngles: DataKey<boolean>;
        public zenMode: DataKey<boolean>;
        public slowerSong: DataKey<boolean>;
        public fasterSong: DataKey<boolean>;
        public superFastSong: DataKey<boolean>;

        constructor() {
            this.noFail = modifiersDataKey('NoFailOn0Energy', false);
            this.oneLife = modifiersDataKey('OneLife', false);
            this.fourLives = modifiersDataKey('FourLives', false);
            this.noBombs = modifiersDataKey('NoBombs', false);
            this.noWalls = modifiersDataKey('NoWalls', false);
            this.noArrows = modifiersDataKey('NoArrows', false);
            this.ghostNotes = modifiersDataKey('GhostNotes', false);
            this.disappearingArrows = modifiersDataKey('DisappearingArrows', false);
            this.smallNotes = modifiersDataKey('SmallNotes', false);
            this.proMode = modifiersDataKey('ProMode', false);
            this.strictAngles = modifiersDataKey('StrictAngles', false);
            this.zenMode = modifiersDataKey('ZenMode', false);
            this.slowerSong = modifiersDataKey('SlowerSong', false);
            this.fasterSong = modifiersDataKey('FasterSong', false);
            this.superFastSong = modifiersDataKey('SuperFastSong', false);
        }

        public update(data: CModifiers | {}): void {
            if (!(data && Object.keys(data).length > 0)) {
                return;
            }
            this.noFail.update(data);
            this.oneLife.update(data);
            this.fourLives.update(data);
            this.noBombs.update(data);
            this.noWalls.update(data);
            this.noArrows.update(data);
            this.ghostNotes.update(data);
            this.disappearingArrows.update(data);
            this.smallNotes.update(data);
            this.proMode.update(data);
            this.strictAngles.update(data);
            this.zenMode.update(data);
            this.slowerSong.update(data);
            this.fasterSong.update(data);
            this.superFastSong.update(data);
        }
    }
}