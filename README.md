# reference.js

Generate a simple API reference from JSON. Made specifically for
<a href="http://peerjs.com">PeerJS</a>, so it probably won't suit your needs.

## Expected style

The `name` property is **required**. Everything else is optional. Anchor IDs
will correspond to the nesting of the current property (e.g.
`Some Class -> klass#method -> argument` has an ID of
`some_class-klassmethod-argument`).

```javascript
[
  {
    "name": "TopLevelClass",
    "type": "constructor",
    "description": "This class does some stuff.",
    "snippet": "var klass = new TopLevelClass(arg1, [callback]);",
    "children": [
      {
        "name": "arg1",
        "type": "string",
        "description": "This is an argument for the constructor."
      },
      {
        "name": "callback",
        "type": "function",
        "description": "This is an optional callback.",
        "optional": true,
        "children": {
          "name": "err",
          "type": "error",
          "description": "Will callback with an error if you messed up."
        }
      }
    ]
  },
  {
    "name": "AnotherTopLevelClass",
    "type": "constructor",
    "description": "This class does some other stuff.",
    "snippet": "var klass2 = new AnotherTopLevelClass(options);",
    "children": {
      "name": "options",
      "type": "object",
      "description": "This is a hash of options for AnotherTopLevelClass.",
      "children": [
        {
          "name": "option1",
          "description": "This is anything, really."
        },
        {
          "name": "option2",
          "description": "This is just really another option."
        }
      ]
    }
  }
]
```

The above should give you something like this:
<img src="http://cl.ly/image/021u0r0j2c2x/Screen%20Shot%202013-09-15%20at%202.30.30%20AM.png">
