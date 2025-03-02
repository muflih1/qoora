class Snowflake {
  private static _instance: Snowflake
  private _epoch: number
  private _shardId: number
  private _sequence: bigint
  private _lastTimestamp: number

  static createInstance() {
    if (!Snowflake._instance) {
      Snowflake._instance = new Snowflake()
    }
    return Snowflake._instance
  }

  constructor (shardId = 0, epoch = 1738348200000) {
    this._epoch = epoch
    this._shardId = shardId
    this._sequence = 0n
    this._lastTimestamp = -1
  }

  now() {
    return Date.now()
  }

  wait(lastTimestamp: number) {
    let timestamp = this.now()
    while (timestamp <= lastTimestamp) {
      timestamp = this.now()
    }
    return timestamp
  }

  nextId() {
    let timestamp = this.now()
    if (timestamp === this._lastTimestamp) {
      this._sequence = (this._sequence + 1n) & 4095n
      if (this._sequence === 0n) {
        timestamp = this.wait(this._lastTimestamp)
      }
    } else {
      this._sequence = 0n
    }
    this._lastTimestamp = timestamp
  
    const timestampPart = BigInt(timestamp - this._epoch) << 22n
    const shardPart = BigInt(this._shardId) << 12n
    const sequencePart = BigInt(this._sequence)
  
    return timestampPart | shardPart | sequencePart
  }
  
}

export const snowflake = Snowflake.createInstance()