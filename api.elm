import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import String
import Http
import Json.Decode as Decode

main =
  Html.program
    { init = init "1"
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

type alias Model = 
  { day : String
  , data : String}

-- MODEL

init : String -> (Model, Cmd Msg)
init day = 
  ( Model day ""
  , getData day)

-- UPDATE

type Msg
  = Change String
  | Load
  | Data (Result Http.Error String)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Change newString ->
      ({ model | day = newString}, Cmd.none)
    Load ->
      (model, getData model.day)
    Data (Ok resData) ->
      ({ model | data = resData }, Cmd.none)
    Data (Err _) ->
      (model, Cmd.none)

-- VIEW

view : Model -> Html Msg
view model = 
  div []
    [ h2 [] [text ("Choose " ++ model.day)]
    , input [placeholder "Day", onInput Change] []
    , button [onClick Load] [text "Load"]
    , p [] [text model.data]
    ]

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model = 
  Sub.none

-- HTTP

getData : String -> Cmd Msg
getData day = 
  let
    url = "https://masy.site/calendar/api2/" ++ day
  in
    Http.send Data (Http.get url decodeData)

decodeData : Decode.Decoder String
decodeData =
  Decode.at ["url"] Decode.string
