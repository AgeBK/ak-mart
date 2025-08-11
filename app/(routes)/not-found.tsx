import ErrorMain from "@/app/ui/error-main";
import data from "@/app/lib/appData.json";

export default function NotFound() {
  // if product id on product page is incorrect or no longer exists, this will load
  // Sorry, the page you're looking for can't be found It looks like there's a problem locating this page. In the mean time, return to our homepage.

  const { notFoundMsg } = data;

  return <ErrorMain message={notFoundMsg} />;
}
