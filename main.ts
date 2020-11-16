input.onButtonPressed(Button.A, function () {
    basic.showString("Moisture Reading (out of 100)")
    MoistureReading = Math.map(pins.analogReadPin(AnalogPin.P0), 0, WetReading, 0, 100)
    _4digit.show(Math.round(MoistureReading))
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    WetReading = pins.analogReadPin(AnalogPin.P0)
    basic.showIcon(IconNames.Butterfly)
})
let MoistureReading = 0
let _4digit: grove.TM1637 = null
let WetReading = 0
WetReading = 600
_4digit = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
basic.showIcon(IconNames.No)
basic.forever(function () {
    MoistureReading = Math.map(pins.analogReadPin(AnalogPin.P0), 0, WetReading, 0, 600)
    basic.pause(100)
    if (MoistureReading <= 200) {
        basic.showLeds(`
            # . . . #
            # # . # #
            . # . # .
            . # . # .
            . # # # .
            `)
        pins.digitalWritePin(DigitalPin.P0, 1)
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P0, 0)
        basic.showIcon(IconNames.House)
        basic.pause(500)
    } else if (MoistureReading > 200 < (MoistureReading <= 400)) {
        basic.showLeds(`
            # . . . #
            # # . # #
            . # # # .
            . # # # .
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # # # #
            # # # # #
            . # # # .
            . # # # .
            . # # # .
            `)
    }
})
