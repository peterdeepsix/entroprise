// Imports
import { makeStyles } from "@material-ui/core/styles"
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActionArea,
} from "@material-ui/core"

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
}))

// Console
console.log("peer")
console.log(peer)
console.log(`LOCATION - PATHNAME - ${location.pathname}`)

// Loadable
import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const InterfaceLayout = Loadable(() => import("src/layouts/InterfaceLayout"), {
  fallback: <IndefiniteLoading message="InterfaceLayout" />,
})

// Use effect hook
useEffect(() => {
  document.title = `You clicked ${count} times`
}, [count])

// Use ref hook
const treeRef = useRef(null)

// State hook
const [count, setCount] = useState(0)
