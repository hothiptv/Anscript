--================================================--
--              ANSCRIPT | v1.1                   --
--================================================--

-- Load WindUI (Stable)
local WindUI = loadstring(game:HttpGet(
    "https://raw.githubusercontent.com/Footagesus/WindUI/main/dist/main.lua"
))()

--================================================--
-- THEME (Dark Clean Purple)
--================================================--
WindUI:AddTheme({
    Name = "ANSCRIPT_DARK",
    Accent = Color3.fromRGB(130, 100, 255),
})

--================================================--
-- CREATE WINDOW
--================================================--
local Window = WindUI:CreateWindow({
    Title = "ANSCRIPT",
    Author = "Nguyễn Trọng An",
    Icon = "solar:code-bold",
    Folder = "ANSCRIPT_DATA",

    Size = UDim2.fromOffset(560, 420),
    Theme = "ANSCRIPT_DARK",

    Transparent = true,
    Resizable = true,
    HideSearchBar = false,
})

-- Version tag
Window:Tag({
    Title = "v1.1",
    Color = Color3.fromRGB(120, 255, 180),
})

--================================================--
-- TAB: SCRIPT
--================================================--
local TabScript = Window:Tab({
    Title = "SCRIPT",
    Icon = "solar:layers-bold"
})

--====================--
-- SECTION: GENERAL
--====================--
local SecGeneral = TabScript:Section({
    Title = "Script Tổng Hợp"
})

local GeneralScripts = {
    {
        Name = "Aimbot Universal",
        Link = "https://raw.githubusercontent.com/yzeedw/Mortalv2-main/main/UNIVERSAL%20AIMBOT"
    },
    {
        Name = "Infinite Yield",
        Link = "https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"
    },
    {
        Name = "Demonology",
        Link = "https://raw.githubusercontent.com/jwaltson91/Pleiadex/refs/heads/main/demonology.lua"
    },
    {
        Name = "Dịch (By Me)",
        Link = "https://raw.githubusercontent.com/hothiptv/Script-SCR/refs/heads/main/Dich"
    },
    {
        Name = "TSB Script",
        Link = "https://raw.githubusercontent.com/ATrainz/Phantasm/refs/heads/main/Games/TSB.lua"
    },
    {
        Name = "Trash Can TSB",
        Link = "https://raw.githubusercontent.com/yes1nt/yes/refs/heads/main/Trashcan%20Man"
    }
}

for _, s in ipairs(GeneralScripts) do
    SecGeneral:Button({
        Title = s.Name,
        Callback = function()
            WindUI:Notify({
                Title = "ANSCRIPT",
                Content = "Đang chạy: " .. s.Name,
                Duration = 3
            })
            pcall(function()
                loadstring(game:HttpGet(s.Link, true))()
            end)
        end
    })
end

--====================--
-- SECTION: BLOX FRUIT
--====================--
local SecBloxFruit = TabScript:Section({
    Title = "Script Blox Fruit"
})

local BloxFruitScripts = {
    {
        Name = "Gravity Hub",
        Link = "https://raw.githubusercontent.com/Dev-GravityHub/BloxFruit/refs/heads/main/Main.lua"
    },
    {
        Name = "Night Hub",
        Link = "https://raw.githubusercontent.com/NIGHTHUBONTOP/Main/main/NightHub.lua"
    },
    {
        Name = "Quantum Onyx Project",
        Link = "https://raw.githubusercontent.com/flazhy/QuantumOnyx/refs/heads/main/QuantumOnyx.lua"
    }
}

for _, s in ipairs(BloxFruitScripts) do
    SecBloxFruit:Button({
        Title = s.Name,
        Callback = function()
            WindUI:Notify({
                Title = "ANSCRIPT",
                Content = "Đang chạy: " .. s.Name,
                Duration = 3
            })
            pcall(function()
                loadstring(game:HttpGet(s.Link, true))()
            end)
        end
    })
end

--================================================--
-- TAB: SETTING
--================================================--
local TabSetting = Window:Tab({
    Title = "SETTING",
    Icon = "solar:settings-bold"
})

local SecSetting = TabSetting:Section({
    Title = "Hệ thống"
})

SecSetting:Colorpicker({
    Title = "Đổi màu chủ đạo",
    Default = Color3.fromRGB(130, 100, 255),
    Callback = function(c)
        Window:SetAccentColor(c)
    end
})

SecSetting:Button({
    Title = "Đóng UI",
    Callback = function()
        Window:Destroy()
    end
})

--================================================--
-- START
--================================================--
Window:SetToggleKey(Enum.KeyCode.RightControl)
TabScript:Select()

WindUI:Notify({
    Title = "ANSCRIPT v1.1",
    Content = "Cập nhật thành công",
    Duration = 4
})

game:GetService("UserInputService").ModalEnabled = false
