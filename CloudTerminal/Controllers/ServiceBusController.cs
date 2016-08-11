using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudSense.Controllers
{
    public class ServiceBusController : Controller
    {
        // GET: ServiceBus
        public ActionResult Explorer()
        {
            return View();
        }
        public ActionResult Queues()
        {
            return View();
        }
        public ActionResult Topics()
        {
            return View();
        }
    }
}