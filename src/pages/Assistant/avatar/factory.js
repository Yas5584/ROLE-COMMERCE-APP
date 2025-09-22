
import { VideoRenderer } from './VideoRenderer'
import { SvgRenderer } from './SvgRenderer'
export function createAvatarRenderer(kind){
  switch((kind||'video').toLowerCase()){
    case 'svg': return new SvgRenderer()
    default: return new VideoRenderer()
  }
}
