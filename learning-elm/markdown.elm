import Html exposing (Html, text, div)
import Html.Attributes exposing (..)
import Markdown

content : Html msg
content =
  Markdown.toHtml [class "content"] """

# Apple Pie Recipe

  1. Invent the universe.
  2. Bake an apple pie.

```
var data = "data"
```

"""

main = div []
  [
    content
  ]
