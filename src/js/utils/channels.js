const frequenciesByBand = {
  A: [
    5865,
    5845,
    5825,
    5805,
    5785,
    5765,
    5745,
    5725
  ],

  B: [
    5733,
    5752,
    5771,
    5790,
    5809,
    5828,
    5847,
    5866
  ],

  E: [
    5705,
    5685,
    5665,
    5645,
    5885,
    5905,
    5925,
    5945
  ],

  F: [
    5740,
    5760,
    5780,
    5800,
    5820,
    5840,
    5860,
    5880
  ],

  R: [
    5658,
    5695,
    5732,
    5769,
    5806,
    5843,
    5880,
    5917
  ]
}

class Channel {
  constructor(band, index, frequency) {
    this.band = band
    this.index = parseInt(index)
    this.frequency = frequency
  }

  get name() {
    return `${this.band}${this.index + 1}`
  }

  get hue() {
    return frequencyToHue(this.frequency)
  }
}

class ChannelCollection {
  constructor(all) {
    this.all = all
  }

  findByFrequency(frequency) {
    return this.all.find(c => c.frequency == frequency)
  }
}

// Initialise initial channel list.
const allChannels = []
for (const band in frequenciesByBand) {
  const frequencies = frequenciesByBand[band]

  for (const index in frequencies) {
    const frequency = frequencies[index]
    const channel = new Channel(band, index, frequency)

    allChannels.push(channel)
  }
}

function frequencyToHue(frequency) {
  return (frequency - 5645) * 1.2
}

export default new ChannelCollection(allChannels)
export { frequencyToHue }
