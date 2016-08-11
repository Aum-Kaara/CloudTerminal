using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudSense.Controllers
{
    public class AzureResourceController : Controller
    {
        // GET: AzureResource
        public ActionResult Index()
        {
            return View();
        }
        //// GET: AzureResource
        //public ActionResult GetAllVM()
        //{
        //   // var orgnaizations = AzureResourceManagerUtil.GetResources();
        //}

        public ActionResult ServiceBus()
        {
            return View();
        }
    }
}