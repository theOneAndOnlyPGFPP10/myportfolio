import { ArticleCard } from '@/types/articles';
import Card from './list/Card';
import FallbackCard from '../FallbackCard';
interface ArticlesOverviewProps {
  type?: 'slider' | 'flexbox' | 'flexboxNEWS' | 'carouselXXL' | 'list';
  content: ArticleCard[];
  category?: 'web-dev' | 'ai-dev' | 'design' | 'embedded';
  head?: number;
  // hashtags?:[]
}

// Pozsotałe propsy do zaimplementowania:
// head -> 
function ArticlesOverview({ type = 'list', content, }: ArticlesOverviewProps) {

  if (type == 'slider') {
    // scroll, pan, drag or whatever
    return <div>Slider</div>;
  } else if (type == 'flexbox') {
    // returns irregular grid
    return <div>Flexbox</div>;
  } else if (type == 'flexboxNEWS') {
    // returns irregular grid that contains ONLY newest Articles from each of category
    return <div>FlexboxNEWS</div>;
  } else if (type == 'carouselXXL') {
    // big carosuel used as Hero or big annoucement
    return <div className="">carouselXXL</div>;
  } 
  else //   regular list, with PAGINATION
  {
    return (
  <div style={{width:"100%"}} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-2">
    {content?.map((item, index) => (
      <Card key={index} item={item} />
      // <FallbackCard key={index}/>
    ))}
  </div>
    );
  }
}

export default ArticlesOverview;
