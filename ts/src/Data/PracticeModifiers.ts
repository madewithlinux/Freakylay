/// <reference path="../Internal/DataKey.ts" />
/// <reference path="../Connector/DataConverter.ts" />

namespace Freakylay.Data {

    import DataKey = Freakylay.Internal.DataKey;
    import CPracticeModeModifiers = Freakylay.Connector.CPracticeModeModifiers;

    function pmmDataKey<T>(key: keyof CPracticeModeModifiers, defaultValue: T) {
        return new DataKey(key, defaultValue);
    }

    export class PracticeModeModifiers {

        public songSpeedMul: DataKey<number>;
        public startInAdvanceAndClearNotes: DataKey<number>;
        public startSongTime: DataKey<number>;

        constructor() {
            this.songSpeedMul = pmmDataKey('SongSpeedMul', 1.0);
            this.startInAdvanceAndClearNotes = pmmDataKey('StartInAdvanceAndClearNotes', 1.0);
            this.startSongTime = pmmDataKey('SongStartTime', 0.0);

            this.startSongTime.setValue(Math.round(this.songSpeedMul.getValue() * 100) / 100);
        }

        public update(data: CPracticeModeModifiers | {}): void {
            if (!(data && Object.keys(data).length > 0)) {
                return;
            }
            this.songSpeedMul.update(data);
            this.startInAdvanceAndClearNotes.update(data);
            this.startSongTime.update(data);
        }
    }
}