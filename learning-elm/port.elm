port module Test exposing (..)

import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

type alias Model = Int

init : (Model, Cmd msg)
init = (0, Cmd.none)

type Msg
  = Increment
  | Decrement
  | Logger
  | Reset Int

port log : Int -> Cmd msg

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Increment ->
      (model + 1, Cmd.none)

    Decrement ->
      (model - 1, Cmd.none)

    Logger ->
      (model, log model)

    Reset zero ->
      (zero, Cmd.none)

port reset : (Int -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
  reset Reset

view model =
  div []
    [ button [ onClick Decrement  ] [ text "-"  ]
    , div [] [ text (toString model)  ]
    , button [ onClick Increment  ] [ text "+"  ]
    , button [ onClick Logger ] [ text "Log" ]
    ]
