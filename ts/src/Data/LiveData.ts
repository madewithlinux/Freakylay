/// <reference path="../Internal/DataKey.ts" />
/// <reference path="../Connector/DataConverter.ts" />

namespace Freakylay.Data {
    import DataKey = Freakylay.Internal.DataKey;

    import DataConverter = Freakylay.Connector.DataConverter;
    import CLiveData = Freakylay.Connector.CLiveData;
    import CBlockHitScore = Freakylay.Connector.CBlockHitScore;

    function liveDataKey<Key extends keyof CLiveData>(key: Key, defaultValue: CLiveData[Key]) {
        return new DataKey(key, defaultValue);
    }

    export class LiveData {
        private dataConverter: DataConverter = new DataConverter();

        public Score: DataKey<number>;
        public ScoreWithMultipliers: DataKey<number>;
        public MaxScore: DataKey<number>;
        public MaxScoreWithMultipliers: DataKey<number>;
        public Rank: DataKey<string>;
        public FullCombo: DataKey<boolean>;
        public Combo: DataKey<number>;
        public Misses: DataKey<number>;
        public Accuracy: DataKey<number>;
        public BlockHitScores: DataKey<CBlockHitScore>;
        public PlayerHealth: DataKey<number>;
        public TimeElapsed: DataKey<number>;

        constructor() {
            this.Score = liveDataKey('Score', 0);
            this.ScoreWithMultipliers = liveDataKey('ScoreWithMultipliers', 0);
            this.MaxScore = liveDataKey('MaxScore', 0);
            this.MaxScoreWithMultipliers = liveDataKey('MaxScoreWithMultipliers', 0);
            this.Rank = liveDataKey('Rank', '');
            this.FullCombo = liveDataKey('FullCombo', false);
            this.Combo = liveDataKey('Combo', 0);
            this.Misses = liveDataKey('Misses', 0);
            this.Accuracy = liveDataKey('Accuracy', 0);
            this.BlockHitScores = liveDataKey('BlockHitScore', { PreSwing: 0, PostSwing: 0, CenterSwing: 0 });
            this.PlayerHealth = liveDataKey('PlayerHealth', 0);
            this.TimeElapsed = liveDataKey('TimeElapsed', 0);
        }

        public update(data: {}): void {
            if (data && Object.keys(data).length > 0) {
                data = this.dataConverter.convertLiveData(data);
            }
            this.Score.update(data);
            this.ScoreWithMultipliers.update(data);
            this.MaxScore.update(data);
            this.MaxScoreWithMultipliers.update(data);
            this.Rank.update(data);
            this.FullCombo.update(data);
            this.Combo.update(data);
            this.Misses.update(data);
            this.Accuracy.update(data);
            this.BlockHitScores.update(data);
            this.PlayerHealth.update(data);
            this.TimeElapsed.update(data);
        }
    }
}