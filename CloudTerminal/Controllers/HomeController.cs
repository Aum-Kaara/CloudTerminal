using CloudSense.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace CloudSense.Controllers
{
    public class HomeController : Controller
    {
        private DataAccess db = new DataAccess();

        public ActionResult Index()
        {
            HomeIndexViewModel model = null;

            if (ClaimsPrincipal.Current.Identity.IsAuthenticated)
            {
                model = new HomeIndexViewModel();
                model.UserOrganizations = new Dictionary<string, Organization>();
                model.UserSubscriptions = new Dictionary<string, Subscription>();
                model.UserCanManageAccessForSubscriptions = new List<string>();
                model.DisconnectedUserOrganizations = new List<string>();

                var orgnaizations = AzureResourceManagerUtil.GetUserOrganizations();
                foreach (Organization org in orgnaizations)
                {
                    model.UserOrganizations.Add(org.Id, org);
                    var subscriptions = AzureResourceManagerUtil.GetUserSubscriptions(org.Id);

                    if (subscriptions != null)
                    {
                        foreach (var subscription in subscriptions)
                        {

                            Subscription s = db.Subscriptions.Find(subscription.Id);
                            if (s != null)
                            {
                                subscription.IsConnected = true;
                                subscription.ConnectedOn = s.ConnectedOn;
                                subscription.ConnectedBy = s.ConnectedBy;
                                subscription.AzureAccessNeedsToBeRepaired = !AzureResourceManagerUtil.ServicePrincipalHasReadAccessToSubscription(subscription.Id, org.Id);
                            }
                            else
                            {
                                subscription.IsConnected = false;
                            }

                            model.UserSubscriptions.Add(subscription.Id, subscription);
                            if (AzureResourceManagerUtil.UserCanManageAccessForSubscription(subscription.Id, org.Id))
                                model.UserCanManageAccessForSubscriptions.Add(subscription.Id);
                        }
                    }
                    else
                        model.DisconnectedUserOrganizations.Add(org.Id);
                }
            }
            return View(model);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        public ActionResult Dashboard()
        {
            HomeIndexViewModel model = null;

            if (ClaimsPrincipal.Current.Identity.IsAuthenticated)
            {
                model = new HomeIndexViewModel();
                model.UserOrganizations = new Dictionary<string, Organization>();
                model.UserSubscriptions = new Dictionary<string, Subscription>();
                model.UserCanManageAccessForSubscriptions = new List<string>();
                model.DisconnectedUserOrganizations = new List<string>();

                var orgnaizations = AzureResourceManagerUtil.GetUserOrganizations();
                foreach (Organization org in orgnaizations)
                {
                    model.UserOrganizations.Add(org.Id, org);
                    var subscriptions = AzureResourceManagerUtil.GetUserSubscriptions(org.Id);

                    if (subscriptions != null)
                    {
                        foreach (var subscription in subscriptions)
                        {

                            Subscription s = db.Subscriptions.Find(subscription.Id);
                            if (s != null)
                            {
                                subscription.IsConnected = true;
                                subscription.ConnectedOn = s.ConnectedOn;
                                subscription.ConnectedBy = s.ConnectedBy;
                                subscription.AzureAccessNeedsToBeRepaired = !AzureResourceManagerUtil.ServicePrincipalHasReadAccessToSubscription(subscription.Id, org.Id);
                            }
                            else
                            {
                                subscription.IsConnected = false;
                            }

                            model.UserSubscriptions.Add(subscription.Id, subscription);
                            if (AzureResourceManagerUtil.UserCanManageAccessForSubscription(subscription.Id, org.Id))
                                model.UserCanManageAccessForSubscriptions.Add(subscription.Id);
                        }
                    }
                    else
                        model.DisconnectedUserOrganizations.Add(org.Id);
                }
            }
            return View(model);
        }

        public ActionResult VirtualMachines()
        {
            return View();
        }

        public string GetVirtualMachines(string SubId)
        {
            return AzureResourceManagerUtil.GetVirtualMachines(SubId);
        }

        public string GetVMInfo(string Id)
        {
            return AzureResourceManagerUtil.GetVMInfo(Id);
        }

        public string CallAPI(string API, string ApiType = "GET")
        {
            return AzureResourceManagerUtil.CallAPI(API, ApiType);
        }

        public ActionResult Board()
        {
            return View();
        }

        public ActionResult SqlServers()
        {
            return View();
        }

        public ActionResult Features()
        {
            return View();
        }

        public ActionResult Storage()
        {
            return View();
        }

        public ActionResult Website()
        {
            return View();
        }

        public ActionResult ServiceBus()
        {
            return View();
        }


        public ActionResult BreadCrumb()
        {
            return View();
        }

    }
}